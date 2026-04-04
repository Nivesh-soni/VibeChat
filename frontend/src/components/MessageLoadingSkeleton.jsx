
function MessagesLoadingSkeleton() {
  return (
    <div className="flex-1 w-full max-w-3xl mx-auto flex flex-col">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"} animate-pulse w-full`}
        >
          <div className={`chat-bubble rounded-t-xl bg-slate-800 h-14 ${index % 2 === 0 ? "w-48 rounded-br-xl" : "w-32 rounded-bl-xl"}`}></div>
        </div>
      ))}
    </div>
  );
}

export default MessagesLoadingSkeleton;
