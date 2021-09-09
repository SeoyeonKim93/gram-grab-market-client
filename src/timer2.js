import React from "react";

function TimeComponent2() {
  const [time, setTime] = React.useState(0);
  console.log("update");
  //   useEffect : 두번째 인자가 바뀔때만 첫번째 인자가 실행 됨
  React.useEffect(function () {
    setTime(time + 1);
    console.log("한번만 호출 됩니다.");
  }, []);
  return (
    <div>
      <h3>{time}초</h3>
      <button>1씩 올려주세요.</button>
    </div>
  );
}
export default TimeComponent2;
