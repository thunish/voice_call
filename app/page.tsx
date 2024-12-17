'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const [roomId, setRoomId]=useState<string>();
  const router=useRouter();

  return (
    <div className=" flex justify-center items-center min-h-screen bg-gray-100">
      <div className=" p-8 w-[350px] flex flex-col space-y-3 shadow-lg rounded-lg border-slate-100 bg-white">
        <div className=" font-bold text-2xl">Join a Video call</div>
        <div>Enter a room ID to join an existing call or create a new one.</div>
        <input onChange={(e)=>{
          setRoomId(e.target.value)
        }} type="text" className="border border-slate-100 py-2 px-2 rounded-md" placeholder="Enter Room Id"/>
        <button onClick={()=>{
          router.push(`/call?roomID=${roomId}`);
        }} className=" bg-black text-white p-2 rounded-lg">Join Room</button>
      </div>
    </div>
  );
}
