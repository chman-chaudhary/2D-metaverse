import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log("User Joined:", email);
    setRemoteSocketId(id);
  });

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    return () => socket.off("user:joined", handleUserJoined);
  }, [socket, handleUserJoined]);

  return (
    <div>
      <h1 className="text-5xl font-semibold text-center my-20">Room Page</h1>
      <h2 className="text-5xl font-semibold text-center my-20">
        {remoteSocketId ? "Your are Connected" : "No one in room"}
      </h2>
    </div>
  );
};

export default RoomPage;
