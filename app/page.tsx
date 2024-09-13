"use client";
import Home from "@/components/Home";
import Second from "@/components/Second";

export default function Landing() {
  return (
    <div className="px-7">
      <div className="h-[100vh] relative">
        <Home />
        <Second />
      </div>
      <div className="h-[50vh]">Cool</div>
    </div>
  );
}
