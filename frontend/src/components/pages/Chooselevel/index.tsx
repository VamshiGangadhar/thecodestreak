const ChooseLevel = () => {
  return (
    <div className="choose-level">
      <h1>Choose Your Level</h1>
      <p>Select a level to start practicing DSA problems.</p>
      <ul>
        <li>
          <a href="/dashboard/level/easy">Easy</a>
        </li>
        <li>
          <a href="/dashboard/level/medium">Medium</a>
        </li>
        <li>
          <a href="/dashboard/level/hard">Hard</a>
        </li>
      </ul>
    </div>
  );
};

export default ChooseLevel;
