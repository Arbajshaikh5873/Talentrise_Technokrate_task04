import React from "react";
import { useDispatch } from "react-redux";

function getDispatch() {
  const dispatch = useDispatch();
  if (dispatch) {
    return dispatch;
  }
}

export default getDispatch;
