import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import SubscriptionBlockerModal from "./SubscriptionBlockerModal";
import axios from "axios";
import "./campaign.css";

export default function CreateCampaign() {
      const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [blocker, setBlocker] = useState({ open: false, message: "" });

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    targetAmount: "",
    deadline: "",       // will use <input type="datetime-local" />
    location: "",
    mediaUrls: "",      // comma separated URLs (optional)
    urgency: "MEDIUM",
    city: "",
    state: "",
    beneficiaryType: "",
  beneficiaryCount: ""
    });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (files) {
      setImageFile(files[0]);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  }

  // convert datetime-local (YYYY-MM-DDTHH:mm) to 'YYYY-MM-DDTHH:mm:ss' (LocalDateTime-like)
function dateToLocalEndOfDay(dateStr) {
  if (!dateStr) return null;
  // dateStr from <input type="date"> is "YYYY-MM-DD"
  return `${dateStr}T23:59:59`;
}

async function handleSubmit(e) {
  e.preventDefault();

  try {
    setLoading(true);

    const fd = new FormData();

    const data = {
      title: form.title || null,
      description: form.description || null,
      category: form.category || null,
      targetAmount: form.targetAmount ? Number(form.targetAmount) : null,
      deadline: form.deadline ? dateToLocalEndOfDay(form.deadline) : null,
      location: form.location || null,
      mediaUrls: form.mediaUrls || null,
      urgency: form.urgency || null,
      city: form.city || null,
      state: form.state || null,
      beneficiaryCount: form.beneficiaryCount || null,
      beneficiaryType: form.beneficiaryType || null
    };

    fd.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    if (imageFile) {
      fd.append("image", imageFile);
    }

    await axios.post(
      "http://localhost:8080/campaigns",
      fd,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Campaign created successfully!");

    setForm({
      title: "",
      description: "",
      category: "",
      targetAmount: "",
      deadline: "",
      location: "",
      mediaUrls: "",
      urgency: "MEDIUM",
      city: "",
      state: "",
      beneficiaryType: "",
      beneficiaryCount: ""
    });

    setImageFile(null);

  } catch (err) {
    const status = err?.response?.status;
    const message =
      err?.response?.data ||
      err?.response?.data?.message ||
      "Something went wrong";

    if (status === 403) {
      setBlocker({
        open: true,
        message: message || "Upgrade your plan to create more campaigns"
      });
      return;
    }

    alert("Failed to create campaign: " + message);
    console.error("Create campaign failed:", err);

  } finally {
    setLoading(false);
  }
}

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);

  //     const fd = new FormData();

  //     // build data object exactly matching CreateCampaignDto
  //     const data = {
  //       title: form.title || null,
  //       description: form.description || null,
  //       category: form.category || null,
  //       targetAmount: form.targetAmount ? Number(form.targetAmount) : null,
  //       // convert to LocalDateTime-like string (no timezone Z)
  //       deadline: form.deadline ? dateToLocalEndOfDay(form.deadline) : null,
  //       location: form.location || null,
  //       mediaUrls: form.mediaUrls || null,
  //       ownerType: form.ownerType || null,
  //       urgency: form.urgency || null,
  //       city: form.city || null,
  //       state: form.state || null,
  //       beneficiaryCount: form.beneficiaryCount || null,
  //       beneficiaryType: form.beneficiaryType || null
  //     };

  //     // Append JSON as application/json blob so Spring can parse @RequestPart("data") -> DTO
  //     fd.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

  //     // optional image file as separate part
  //     if (imageFile) {
  //       fd.append("image", imageFile);
  //     }

  //     // do NOT set Content-Type manually — axios will set boundary
  //     const res = await axios.post("http://localhost:8080/campaigns", fd, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });

  //     if(res.ok){
  //     alert("Campaign created successfully!");
  //     // reset form
  //     setForm({
  //       title: "",
  //       description: "",
  //       category: "",
  //       targetAmount: "",
  //       deadline: "",
  //       location: "",
  //       mediaUrls: "",
  //       ownerType: "NGO",
  //       urgency: "MEDIUM",
  //       city: "",
  //       state: ""
  //     });
  //     setImageFile(null);
  //   }else if(res.status == 403){
  //     console.log("here");
  //     setBlocker({
  //     open: true,
  //     message: text || "Upgrade your plan to create more campaigns"
  //   });
  //   return;
  //   }
  //   } catch (err) {
  //     console.error("Create campaign failed:", err?.response?.data || err);
  //     alert("Failed to create campaign: " + (err?.response?.data?.message || err.message));
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <div className="campaign-container">
      <h2>Create New Campaign</h2>

      <form className="campaign-form" onSubmit={handleSubmit}>
        <div className="form-group full-width">
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </div>

        {/* <div className="form-group">
          <label>Category</label>
          <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. MEDICAL" />
        </div> */}

         <div className="form-group">
           <label>Category</label>
           <select name="category" value={form.category} onChange={handleChange} required>
             <option value="">Select</option>
             <option value="EDUCATION">Education</option>
             <option value="MEDICAL">Medical</option>
             <option value="WOMEN">Women Support</option>
             <option value="ELDERLY">Elderly Support</option>
             <option value="FOOD">Food Distribution</option>
             <option value="OTHER">Other</option>
           </select>
         </div>    
        <div className="form-group">
          <label>Target Amount (₹)</label>
          <input type="number" name="targetAmount" value={form.targetAmount} onChange={handleChange} />
        </div>

<div className="form-group">
  <label>Beneficiary Type</label>
  <input
    name="beneficiaryType"
    value={form.beneficiaryType}
    onChange={handleChange}
    placeholder="Children, Women, Elderly"
  />
</div>

<div className="form-group">
  <label>Beneficiary Count</label>
  <input
    type="number"
    name="beneficiaryCount"
    value={form.beneficiaryCount}
    onChange={handleChange}
  />
</div>
       <div className="form-group">
  <label>Deadline</label>
  <input
    type="date"
    name="deadline"
    value={form.deadline}
    onChange={handleChange}
    required
  />
  <small className="muted">
    Pick the last date for this campaign — deadline will be set to the end of that day.
  </small>
</div>

        <div className="form-group">
          <label>Urgency</label>
          <select name="urgency" value={form.urgency} onChange={handleChange}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <hr className="divider" />

        <h3>Location</h3>

        <div className="form-group">
          <label>City</label>
          <input name="city" value={form.city} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>State</label>
          <input name="state" value={form.state} onChange={handleChange} />
        </div>

        <div className="form-group full-width">
          <label>Location / Address</label>
          <input name="location" value={form.location} onChange={handleChange} />
        </div>

        <div className="form-group full-width">
          <label>Media URLs (optional, comma-separated)</label>
          <input name="mediaUrls" value={form.mediaUrls} onChange={handleChange} placeholder="https://...,https://..." />
        </div>

        <div className="form-group full-width">
          <label>Featured Image (optional)</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </div>

        <button className="campaign-create-btn" type="submit" disabled={loading}>
          {loading ? "Creating…" : "Create Campaign"}
        </button>
      </form>
      <SubscriptionBlockerModal
        open={blocker.open}
        message={blocker.message}
        onUpgrade={() => navigate("/ngo/subscriptions")}
        onClose={() => setBlocker({ open: false })}
      />
    </div>
  );
}
