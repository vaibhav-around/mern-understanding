function TodoItem({ title = "Learn React", completed = false, tag = "Learning" }) {
  return (
    <div className="group flex items-center justify-between p-4 bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 hover:border-indigo-500/40 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200 ease-out backdrop-blur-sm">
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            defaultChecked={completed}
            className="peer sr-only"
          />
          <div className="w-5 h-5 rounded-lg border-2 border-slate-600 peer-checked:border-indigo-500 peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-600 transition-all duration-200 flex items-center justify-center">
            <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </label>

        <div className="flex-1 min-w-0">
          <h3 className={`text-sm sm:text-base font-medium truncate transition-all duration-200 ${
            completed ? "line-through text-slate-500" : "text-slate-200 group-hover:text-white"
          }`}>
            {title}
          </h3>
        </div>

        {tag && (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-700/60 text-indigo-300 border border-slate-600/50 hidden sm:inline-block">
            {tag}
          </span>
        )}
      </div>

      <button className="ml-3 p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all duration-200 cursor-pointer flex items-center justify-center">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <span className="sr-only">Delete</span>
      </button>
    </div>
  );
}

export default TodoItem;