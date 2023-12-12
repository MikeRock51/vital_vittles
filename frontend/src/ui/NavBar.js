import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../stateProvider/authStore";
import { LogoutUser } from "../utils/Connector";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const BASE_URL = process.env.REACT_APP_API_URL;

export default function Navbar() {
  const { currentUser, setCurrentUser, authToken, setAuthToken } = useUserStore()
  const location = useLocation();
  const navigate = useNavigate();
  const authNavs = [
    { name: "Home", href: "/", current: location.pathname === "/" },
    {
      name: "Recipes",
      href: "/recipes",
      current: location.pathname === "/recipes",
    },
    { name: "Create Recipe", href: "/recipes/new", current: false },
    { name: "Chat with Yishu", href: "/yishu", current: false },
  ];

  const noAuthNavs = [
    { name: "Home", href: "/", current: location.pathname === "/" },
    {
      name: "Sign Up",
      href: "/signup",
      current: location.pathname === "/signup",
    },
    {
      name: "Sign In",
      href: "/signin",
      current: location.pathname === "/signin",
    },
  ];

  const navigation = currentUser ? authNavs : noAuthNavs;

  // TODO
    // Check if user token is valid, otherwise redirect to login page

  async function signOut() {
    await LogoutUser(authToken);
    setCurrentUser(null);
    setAuthToken(null);
    navigate('/signin');
  }

  
  return (
    <Disclosure
      as="nav"
      className="shadow-white mb-5 bg-primary-700 py-1 shadow-md"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 text-white sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-primary-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link to="/" className="items-center py-5" title="Go Home">
                  <img
                    className="relative h-auto"
                    src="/assets/chef.svg"
                    alt="Chef illustration icon"
                    width="50"
                  />
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex h-full space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-primary-900 text-white"
                            : "text-white hover:bg-primary-800",
                          "my-auto h-fit rounded-md px-3 py-2 text-sm font-bold",
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {currentUser && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-primary-900 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-primary-900 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={`${BASE_URL}/users/dp/${currentUser.id}`}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 ring-black ring-opacity-5 shadow-lg focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/profile"
                              className={classNames(
                                active ? "bg-primary-40" : "",
                                "block px-4 py-2 text-sm text-gray-700",
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/recipes/me"
                              className={classNames(
                                active ? "bg-primary-40" : "",
                                "block px-4 py-2 text-sm text-gray-700",
                              )}
                            >
                              My Recipes
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className="mx-auto block w-full px-4 py-2 text-sm text-gray-700 hover:bg-primary-40"
                              onClick={() => signOut()}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-primary-900 text-white"
                      : "text-white hover:bg-primary-800",
                    "block rounded-md px-3 py-2 text-base font-medium",
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
