'use client'

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";


function randomID(len: number) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}



export default function Call() {
  
  
  const searchParams=useSearchParams();
  const meetingRef=useRef(false)

  useEffect(()=>{
    if(!meetingRef.current){
      myMeeting();
      meetingRef.current=true
    }
  }, []);

  let myMeeting: any = async (element: HTMLElement) => {
    const roomID = searchParams.get('roomID') || randomID(5);
    console.log(roomID, "This is the room Id")
    const appID: number = Number(process.env.NEXT_PUBLIC_AppId);
    const serverSecret:any = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;
    const kitToken = await  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));
    const zp = await ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: document.getElementById('meet'),
      sharedLinks: [
              {
                name: 'Personal link',
                url:
                  window.location.protocol + '//' + 
                  window.location.host + window.location.pathname +
                  '?roomID=' +
                  roomID,
              },
        ],
      scenario: {
              mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      turnOnCameraWhenJoining:false,
      showMyCameraToggleButton:false,
      showAudioVideoSettingsButton:false,
      showScreenSharingButton:false
      
    });
  }

  return (
    <div>
      <div className=" h-screen w-screen" id="meet"  ></div>
    </div>
  );
}
