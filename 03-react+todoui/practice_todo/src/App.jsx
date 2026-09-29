import TodoItem from "./TodoItem";
import Header from "./Header";

const App = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main glassmorphic card container */}
      <div className="w-full max-w-xl bg-slate-900/80 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/50 space-y-6 relative z-10">
        <Header />

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1 pb-1">
            <span>Tasks (3)</span>
            <span className="text-indigo-400">1 of 3 Completed</span>
          </div>
          
          <TodoItem title="Learn React Component Architecture" completed={true} tag="React" />
          <TodoItem title="Style page with Tailwind CSS v4" completed={false} tag="Styling" />
          <TodoItem title="Build full-stack MERN application" completed={false} tag="Project" />
        </div>

        {/* Footer info bar */}
        <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Press task to toggle completion</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Synced
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;