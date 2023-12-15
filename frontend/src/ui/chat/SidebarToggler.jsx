function SidebarToggler({ showSidebar, setShowSidebar }) {
  return (
    <button
        className={`absolute -right-8 top-0 mt-6 h-fit text-primary-600 focus:outline-none active:border hover:border border-primary-600 rounded`}
        onClick={() => setShowSidebar(!showSidebar)}
        onBlur={(e) => {
          if (!e.relatedTarget) {
            // setTimeout(() => setShowSidebar(false), 5000);
            setShowSidebar(false);
          }
        }}
      >
        {showSidebar ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-7 w-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-7 w-7 scale-x-[-1] transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>
  )
}

export default SidebarToggler
