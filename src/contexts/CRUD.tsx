import { useEffect, useState } from "react";
import { api } from "../services/api";

export const useCRUD = () => {
  const [activity, setActivity] = useState<string[]>([]);

  const [totalTime, setTotalTime] = useState(0);

  const getActivity = async () => {
    const res = await api
      .get("activities")
      .catch((err) => console.log("Error:", err));

    if (res && res.data) {
      setActivity(res.data);

      const a: any[] = [];
      res.data.map((i: any) => {
        a.push(parseInt(i.time));
        const b = a.reduce((b, i) => b + i);
        setTotalTime(b);
      });
    }
  };

  useEffect(() => {
    getActivity();
  }, []);

  return {
    activity,
    totalTime,
    getActivity,
    setTotalTime,
  };
};
