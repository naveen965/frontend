import { useEffect, useState } from "react";
import "./candidates.scss";
import httpModule from "../../helpers/http.module";
import { ICandidate } from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { redirect } from "react-router-dom";
import CandidatesGrid from "../../components/candidates/CandidatesGrid.component";

const Candidates = () => {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<ICandidate[]>("/Candidate/Get")
      .then((response) => {
        setCandidates(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);

  // console.log(jobs);

  return (
    <div className="content candidates">
      <div className="heading">
        <h2>Jobs</h2>
        <Button variant="outlined" onClick={() => redirect("/candidates/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : candidates.length === 0 ? (
        <h1>No Candidate</h1>
      ) : (
        <CandidatesGrid data={candidates} />
      )}
    </div>
  );
};

export default Candidates;
