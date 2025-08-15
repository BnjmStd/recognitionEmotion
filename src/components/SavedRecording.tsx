import "./SavedRecording.css";

export const SaveRecording = () => {
  return (
    <article className="capture-video">
      <div className="capture-video--container">
        <header>
          <h2>Save Recording</h2>

          <ul>
            <li>
              <button className="button-primary">Analyze Recording</button>
            </li>
          </ul>
        </header>

        <div className="capture-video--preview"></div>
      </div>
    </article>
  );
};
