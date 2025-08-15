import "./CaptureVideo.css"

export const CaptureVideo = () => {
  return (
    <article className="capture-video">
      <div className="capture-video--container">
        <header>
          <h2>Video Recording</h2>

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
