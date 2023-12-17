import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import RecipeFilteredSearch from "./RecipeFilteredSearch";
import { useRecipeStore } from "../stateProvider/recipeStore";

const filters = [
  {
    id: "cuisines",
    name: "Cuisines",
    options: [
      { value: "nigerian", label: "Nigerian", checked: false },
      { value: "ghanaian", label: "Ghanaian", checked: false },
      { value: "west african", label: "West African", checked: true },
      { value: "kenyan", label: "Kenyan", checked: false },
      { value: "south african", label: "South African", checked: false },
      { value: "ivorian", label: "Ivorian", checked: false },
    ],
  },
  {
    id: "ingreddients",
    name: "Ingredients",
    options: [
      { value: "onion", label: "Onion", checked: false },
      { value: "tomato", label: "Tomato", checked: false },
      { value: "vegetable", label: "Vegetable", checked: true },
      { value: "ginger", label: "Ginger", checked: false },
      { value: "curry", label: "Curry", checked: false },
    ],
  },
  {
    id: "cook_time",
    name: "Cooking Time",
    options: [
      { value: "10", label: "10 Minutes", checked: false },
      { value: "15", label: "15 Minutes", checked: false },
      { value: "20", label: "20 Minutes", checked: false },
      { value: "30", label: "30 Minutes", checked: false },
      { value: "45", label: "45 Minutes", checked: false },
      { value: "60", label: "60 Minutes", checked: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RecipeFilters() {
  const { filtersOpen, setFiltersOpen } = useRecipeStore();

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={filtersOpen} as={Fragment}>
          {/* Remove */}
          <Dialog
            as="div"
            className="relative z-40"
            onClose={setFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="items-baseline justify-between border-gray-400 pb-2">
            <h1 className="mb-5 text-left text-4xl font-bold tracking-tight text-gray-900">
              Amazing Recipes in Africa
            </h1>
            <div className="">
              <RecipeFilteredSearch />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
