import { useState } from "react";
import { useNavigate } from "react-router";

const useCardManagement = (type) => {
  const [mouseEvent, setMouseEvent] = useState({
    hover: false,
    id: ``
  });

  const navigate = useNavigate();

  const onHover = (id) => {
    setMouseEvent((prevEvent) => ({ ...prevEvent, hover: true, id }));
  };

  const resetEvent = () =>
    setMouseEvent({
      hover: false,
      id: ``
    });

  const cardClick = (id) => {
    navigate(`/${type}/${id}`);
  };

  const mouseEventHandler = {
    onHover,
    resetEvent,
    cardClick
  };

  return { mouseEventHandler, mouseEvent };
};

export default useCardManagement;
