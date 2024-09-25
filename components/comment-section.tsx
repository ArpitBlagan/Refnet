import { Button } from "./ui/button";
import { Input } from "./ui/input";

const CommentSection = () => {
  return (
    <div>
      <div className="flex flex-col gap-3 border-t border-zinc-700 py-4">
        <form className="flex items-center gap-2">
          <Input
            placeholder="comment your thoughts..."
            className="flex-1 py-2 pl-3 h-[50px] font-semibold resize-none bg-slate-900 border-zinc-600"
          />
          <Button className="bg-green-600 hover:bg-green-700 py-2">
            comment
          </Button>
        </form>
        <h1 className="text-2xl font-semibold">Comments</h1>
      </div>
    </div>
  );
};

export default CommentSection;
