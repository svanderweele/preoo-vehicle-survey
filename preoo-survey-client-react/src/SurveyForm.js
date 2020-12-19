export default function SurveyForm() {
  return (
    <div className="container">
      <header className="d-flex justify-content-center">
        <h3>Questionaire</h3>
      </header>
      <div className="card">
        <div className="card-body">
          <div className="col">
            <div className="row">
              <div className="d-flex justify-content-start">
                <div className="d-flex justify-content-center">
                  <div className="row-12 justify-content-center">
                    <h3 className="my-0 p-0">08</h3>
                    <div
                      className="row-12 justify-content-center"
                      style={{ height: "0.25rem", backgroundColor: "#58CBB3" }}
                    ></div>
                  </div>
                </div>
                {/* TODO: Figure out why ml-2 not working */}
                <div className="d-flex justify-content-center align-items-center">
                  <small className="text-muted"> of 09</small>
                </div>
              </div>
            </div>
            <div className="row"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
