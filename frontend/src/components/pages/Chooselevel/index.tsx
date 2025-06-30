export function ChooseLevel() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="text-center mb-4">Choose Your Level</h1>
      <p className="text-muted text-center mb-5">
        Select a level to start your coding journey.
      </p>
      <div className="d-flex gap-3">
        <button className="btn btn-primary">Beginner</button>
        <button className="btn btn-secondary">Intermediate</button>
        <button className="btn btn-success">Advanced</button>
      </div>
    </div>
  );
}
