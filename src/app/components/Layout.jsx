"use client";
import { useEffect, useState } from "react";
import { FaBeer, FaChartPie, FaBars } from "react-icons/fa";
import { TbHeartHandshake } from "react-icons/tb";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { checkConnection, retrievePublicKey } from "../utils/Freighter"; // Import functions from freighter module
import { useGlobalContext } from "../context/GlobalContext";

const Layout = ({ children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connected, setConnected] = useState(false); // State to track if the user is connected
  const [isConnecting, setIsConnecting] = useState(false); // State to track if the connection is in progress
  const router = useRouter();
  const pathname = usePathname();
  const { publicKey, setPublicKey, role, setRole } = useGlobalContext(); // Use publicKey and setPublicKey from context

  useEffect(() => {
    // connect();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("publicKey");
    setConnected(false);
    setPublicKey(null);
    router.push("/");
  };

  // Function to truncate the text
  const getTruncatedPublicKey = (inputText) => {
    if (!inputText) return ""; // Handle undefined/null cases

    // Directly slice the string instead of splitting by spaces
    const firstFive = inputText.slice(0, 5); // First 5 characters
    const lastFive = inputText.slice(-5); // Last 5 characters

    return `${firstFive} ... ${lastFive}`; // Combine them with "..."
  };

  async function connect() {
    setIsConnecting(true); // Set isConnecting to true when connection process starts
    try {
      // Check if connection to Freighter is established
      if (await checkConnection()) {
        // Retrieve public key from Freighter
        const publicKey = await retrievePublicKey();
        if (publicKey) {
          setPublicKey(publicKey); // Set the retrieved public key
          setConnected(true); // Set connected state to true

          // Store the public key in local storage
          localStorage.setItem("publicKey", publicKey);

          // Determine the role based on the current path
          const currentPath = window.location.pathname;
          const userRole = currentPath.startsWith("/donors/dashboard")
            ? "Donor"
            : "Feeder";
          setRole(userRole);
        }
      }
    } catch (error) {
      console.error("Error connecting to Freighter:", error); // Log any errors during the connection process
    } finally {
      setIsConnecting(false); // Set isConnecting to false when connection process ends
    }
  }

  const transClass = dropdownOpen ? "block" : "hidden";
  const sidebarClass = sidebarOpen ? "transform-none" : "-translate-x-full";

  return (
    <div className="h-screen">
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span className="sr-only">Open sidebar</span>
                <FaBars />
              </button>
              <a href="/" className="flex items-center ms-2 md:me-24">
                <TbHeartHandshake className="me-2 text-2xl dark:text-white" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  PawPatrons
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <button
                onClick={connect} // Call the connect function when the button is clicked
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                disabled={isConnecting} // Disable the button if the connection is in progress
              >
                {/* {isConnecting
                  ? "Connecting.."
                  : connected
                  ? getTruncatedPublicKey(publicKey) // Call your truncation function here
                  : "Connect to Freighter"} */}
                  {
                    publicKey ? getTruncatedPublicKey(publicKey) : "Connect to Freighter"
                  }
              </button>

              <div className="flex items-center ms-3 relative">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://mighty.tools/mockmind-api/content/cartoon/31.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className={`absolute right-0 top-6 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 ${transClass}`}
                  id="dropdown-user"
                >
                  {/* <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {role}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 overflow-hidden truncate w-40 dark:text-gray-300"
                      role="none"
                    >
                      {publicKey}
                    </p>
                  </div> */}
                  <ul className="py-1" role="none">
                    <li>
                      <Link
                        href={`${
                          role === "Donor"
                            ? "/donors/dashboard"
                            : "/feeders/dashboard"
                        }`}
                        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white ${
                          pathname === "/donors/dashboard" ||
                          pathname === "/feeders/dashboard"
                            ? "bg-gray-100 dark:bg-gray-600 dark:text-white"
                            : ""
                        }`}
                        role="menuitem"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/profile"
                        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white ${
                          pathname === "/profile"
                            ? "bg-gray-100 dark:bg-gray-600 dark:text-white"
                            : ""
                        }`}
                        role="menuitem"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <a
                        onClick={handleLogout}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Disconnect wallet
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${sidebarClass}`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/donors/dashboard"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathname === "/donors/dashboard"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <FaChartPie />
                <span className="ms-3">Donor</span>
              </Link>
            </li>
            <li>
              <Link
                href="/feeders/dashboard"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathname === "/feeders/dashboard"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <FaChartPie />
                <span className="ms-3">Feeder</span>
              </Link>
            </li>
            <li>
              <Link
                href="/wallet"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group${
                  pathname === "/wallet"
                    ? "bg-gray-100 dark:bg-gray-600 dark:text-white"
                    : ""
                }`}
              >
                <FaBeer />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Wallet & History
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-2 rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
