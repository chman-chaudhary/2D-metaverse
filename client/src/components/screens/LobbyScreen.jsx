import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import { useNavigate } from "react-router-dom";

const lobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback((data) => {
    console.log("Room:", data.room);
    navigate(`/room/${data.room}`);
  }, []);

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => socket.off("room:join", handleJoinRoom);
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <h1>Lobby Screen</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room:</label>
        <input
          type="text"
          id="room"
          name="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
};

export default lobbyScreen;
