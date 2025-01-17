import Empty from "./1-tab";
import { useState } from "react";
import Multi from "./2-multi";
import ExternalApi from "./3-external-api";
import WebSocketComponent from "./4-web-socket";
import ComponentUpdate from "./5-component-update";

const navigation = [
  { name: "Tabs", target: "Tabs" },
  { name: "Multi select", target: "Multi select" },
  { name: "External Api", target: "External Api" },
  { name: "Web Socket", target: "Web Socket" },
  { name: "Component update", target: "Component update" },
];

export default function Index() {
  const [page, setPage] = useState("Tabs");
  const [count, setCount] = useState(0); // State for count

  return (
    <>
      <header className="min-h-full">
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12"
                    src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
                    alt="your company"
                  />
                </div>
                <div className="hidden md:block">
                  <div className=" flex items-baseline space-x-4">
                    {navigation.map((item) =>
                      item.name === "Component update" ? (
                        <a
                          key={item.name}
                          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                          onClick={() => setPage(item.target)}
                        >
                          {item.name}
                          <span className="inline-flex items-center px-2 text-white bg-red-500 rounded-full shadow-md ml-2">
                            {count}
                          </span>
                        </a>
                      ) : (
                        <a
                          key={item.name}
                          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                          onClick={() => setPage(item.target)}
                        >
                          {item.name}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        {/* Render the component for the current page */}
        {page === "Tabs" && <Empty />}
        {page === "Multi select" && <Multi />}
        {page === "External Api" && <ExternalApi />}
        {page === "Web Socket" && <WebSocketComponent />}
        {page === "Component update" && (
          <ComponentUpdate count={count} setCount={setCount} />
        )}
      </main>
    </>
  );
}
