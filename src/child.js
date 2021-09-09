function ChildComponent(props) {
  const { name, age } = props;

  return (
    <div>
      <p>나는 자식이다.</p>
      <p>
        이름은 {name} 나이는 {age}입니다
      </p>
    </div>
  );
}

export default ChildComponent;
