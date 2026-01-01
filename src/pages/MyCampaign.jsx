import React, { useEffect, useState } from "react";
import axios from "axios";
import CampaignCard from "./CampaignCard";
import "./campaign.css";

const MyCampaigns = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("herre");

      const res = await axios.get("http://localhost:8080/campaigns/my-campaigns", {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("res is ",res);

      setList(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="campaign-list">
      {list.map((item) => (
        <CampaignCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default MyCampaigns;
