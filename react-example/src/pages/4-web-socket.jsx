/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const WebSocketComponent = () => {
  const [data, setData] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    // Create a new WebSocket instance
    const ws = new WebSocket("ws://localhost:8080/ws-json");

    // Event: Connection established
    ws.onopen = () => {
      console.log("WebSocket connection established");
      setConnectionStatus("Connected");
    };

    // Event: Message received
    ws.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        console.log("Received data:", parsedData);
        setData(parsedData); // Update state with received data
        setTimestamp(new Date().toLocaleString()); // Set the current timestamp
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    // Event: Connection closed
    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setConnectionStatus("Disconnected");
    };

    // Event: Error occurred
    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      setConnectionStatus("Error");
    };

    // Cleanup on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Web Socket
          </h1>
          <p className="text-gray-500 text-md">
            Example of how React works with Web Socket
          </p>
          <p className="text-gray-600">
            Connection Status: <strong>{connectionStatus}</strong>
          </p>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col gap-4">
          {data ? (
            <Content data={data} timestamp={timestamp} />
          ) : (
            <p>Waiting for data...</p>
          )}
        </div>
      </main>
    </>
  );
};

function Content({ data, timestamp }) {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            EC&apos;s Hardware Monitor
            <i
              className="fa-brands fa-react"
              style={{ float: "right", paddingTop: "0.8rem" }}
            ></i>
          </h1>
          <div id="ws">
            <div id="update-timestamp">
              <p>
                <i style={{ color: "green" }} className="fa fa-circle"></i>{" "}
                {timestamp || "No data received yet"}
              </p>
            </div>
            <hr />
            <div id="monitor-data">
              <div className="row monitor-row">
                <div className="col-md-6">
                  <h5>
                    <i
                      className="fa-solid fa-desktop"
                      style={{ marginRight: "0.5rem" }}
                    ></i>{" "}
                    System
                  </h5>
                  <div id="system-data">
                    <SystemSection data={data} />
                  </div>
                  <h5>
                    <i
                      className="fa-solid fa-server"
                      style={{ marginRight: "0.5rem" }}
                    ></i>{" "}
                    Disk
                  </h5>
                  <div id="disk-data">
                    <DiskSection data={data.disk} />
                  </div>
                </div>
                <div className="col-md-6">
                  <h5>
                    <i
                      className="fa-solid fa-microchip"
                      style={{ marginRight: "0.5rem" }}
                    ></i>{" "}
                    CPU
                  </h5>
                  <div id="cpu-data">
                    <CpuSection data={data.cpu} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemSection({ data }) {
  const { operating_system, platform, hostname, processes, memory } = data;

  return (
    <>
      <table className="table table-striped table-hover table-sm">
        <tbody>
          <tr>
            <td>Operating System:</td>
            <td>{operating_system}</td>
          </tr>
          <tr>
            <td>Platform:</td>
            <td>{platform}</td>
          </tr>
          <tr>
            <td>Hostname:</td>
            <td>{hostname}</td>
          </tr>
          <tr>
            <td>Number of processes running:</td>
            <td>{processes}</td>
          </tr>
          <tr>
            <td>Total memory:</td>
            <td>{memory.total_mb} MB</td>
          </tr>
          <tr>
            <td>Free memory:</td>
            <td>{memory.free_mb} MB</td>
          </tr>
          <tr>
            <td>Percentage used memory:</td>
            <td>{memory.used_percent.toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function DiskSection({ data }) {
  const { total_gb, used_gb, free_gb, used_percent } = data;

  return (
    <>
      <table className="table table-striped table-hover table-sm">
        <tbody>
          <tr>
            <td>Total disk space:</td>
            <td>{total_gb} GB</td>
          </tr>
          <tr>
            <td>Used disk space:</td>
            <td>{used_gb} GB</td>
          </tr>
          <tr>
            <td>Free disk space:</td>
            <td>{free_gb} GB</td>
          </tr>
          <tr>
            <td>Percentage disk space usage:</td>
            <td>{used_percent.toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function CpuSection({ data }) {
  const { model_name, family, speed_mhz, core_usage } = data;

  return (
    <>
      <table className="table table-striped table-hover table-sm">
        <tbody>
          <tr>
            <td>Model Name:</td>
            <td>{model_name}</td>
          </tr>
          <tr>
            <td>Family:</td>
            <td>{family}</td>
          </tr>
          <tr>
            <td>Speed:</td>
            <td>{speed_mhz} MHz</td>
          </tr>
          <tr>
            <td>Cores:</td>
            <td>
              {core_usage.map((usage, index) => (
                <div key={index}>
                  CPU [{index}]: {usage.toFixed(2)}%
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default WebSocketComponent;
