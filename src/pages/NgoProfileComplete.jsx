
  import React, { useState, useContext, useEffect } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  import { AuthContext } from "../context/AuthContext";
  import "./ngoProfile.css";

  export default function NgoProfileComplete() {
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);

    /* ----------------------------
      STATE
    ---------------------------- */
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [profileLoading, setProfileLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [errors, setErrors] = useState({});
    const [catOpen, setCatOpen] = useState(false);

    useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest(".multi-select")) {
        setCatOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);


    const [form, setForm] = useState({
      ngoName: "",
      registrationNumber: "",
      bankAccount: "",
      ifsc: "",
      address: "",
      accountHolderName:"",
      email:"",
      phone:"",
      bankName:"",
      city: "",
      district: "",
      state: "",
      pincode: "",
      description: "",
      categories: [],
    });

    /* ----------------------------
      REDIRECT NON-NGO
    ---------------------------- */
    useEffect(() => {
      if (!loading && user && user.userType !== "NGO") {
        navigate("/unauthorized");
      }
    }, [loading, user, navigate]);

    /* ----------------------------
      FETCH EXISTING PROFILE
    ---------------------------- */
    useEffect(() => {
      if (!user || loading) return;

      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(
            "http://localhost:8080/ngo/profile/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.data) {
            console.log("res data in if ",res.data);
            setForm({
              ngoName: res.data.ngoName || "",
              registrationNumber: res.data.registrationNumber || "",
              accountHolderName:res.data.accountHolderName,
              bankAccount: res.data.bankAccount || "",
              ifsc: res.data.ifsc || "",
              address: res.data.address || "",
              city: res.data.city || "",
              state: res.data.state || "",
              pincode: res.data.pincode || "",
              description: res.data.description || "",
               categories: Array.isArray(res.data.categories)
              ? res.data.categories
              : typeof res.data.categories === "string"
              ? res.data.categories.split(",").map(c => c.trim()).filter(Boolean)
              : [],
                email: res.data.email,
                phone:res.data.phone,
                district:res.data.district,
                bankName:res.data.bankName
            });
            setIsEditMode(true);
          }
        } catch {
          setIsEditMode(false);
        } finally {
          setProfileLoading(false);
        }
      };

      fetchProfile();
    }, [user, loading]);

    if (loading || profileLoading) {
      return <div className="ngo-loading">Loading...</div>;
    }

  const validateStep = (s) => {
  const e = {};

  if (s === 1) {
    if (!form.ngoName.trim()) e.ngoName = "NGO name required";
    if (!form.registrationNumber.trim()) e.registrationNumber = "Registration number required";
    if (!form.email.trim()) e.email = "Email required";
    if (!form.phone.trim()) e.phone = "Phone required";
  }

  if (s === 2) {
    if (!form.address.trim()) e.address = "Address required";
    if (!form.city.trim()) e.city = "City required";
    if (!form.district.trim()) e.district = "District required";
    if (!form.state.trim()) e.state = "State required";
    if (!form.pincode.trim()) e.pincode = "Pincode required";
  }

  if (s === 3) {
    if (!form.accountHolderName.trim()) e.accountHolderName = "Account holder required";
    if (!form.bankName.trim()) e.bankName = "Bank name required";
    if (!form.bankAccount.trim()) e.bankAccount = "Bank account required";
    if (!form.ifsc.trim()) e.ifsc = "IFSC required";
  }

  if (s === 4) {
    if (!form.description.trim()) e.description = "Description required";
    if (form.categories.length === 0) e.categories = "Select at least one category";
  }

  setErrors(e);
  return Object.keys(e).length === 0;
};


    /* ----------------------------
      HANDLERS
    ---------------------------- */
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((p) => ({ ...p, [name]: value }));
      if (errors[name]) setErrors((p) => ({ ...p, [name]: null }));
    };

    const next = () => validateStep(step) && setStep(step + 1);
    const prev = () => setStep(step - 1);

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
        setStep(1);
        return;
      }

      setSubmitting(true);
      try {
        const token = localStorage.getItem("token");
        console.log("token is ",token);
        console.log("categories are ",form.categories);
        const payload = {
          ...form,
          categories: form.categories
        };

        console.log("paylod is ",payload);
        await axios.post(
          "http://localhost:8080/ngo/profile/complete",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(isEditMode ? "Profile updated successfully" : "Profile created successfully");
        navigate("/ngo-dashboard");
      } catch (err) {
        console.log("error is ",err);
        alert(err.response?.data || "Failed to save profile");
      } finally {
        setSubmitting(false);
      }
    };

    const CATEGORY_OPTIONS = [
    "HEALTH",
    "EDUCATION",
    "CHILDREN",
    "WOMEN",
    "ENVIRONMENT",
    "DISASTER_RELIEF",
    "ANIMAL_WELFARE",
  ];
    /* ----------------------------
      UI
    ---------------------------- */
    return (
      <div className="ngo-profile-page">
        <div className="ngo-card">
          <div className="ngo-header">
            <h2>{isEditMode ? "Update NGO Profile" : "Complete NGO Profile"}</h2>
            <div className="ngo-sub">
              Provide accurate details to activate your NGO account
            </div>
          </div>

          {/* PROGRESS */}
          <div className="progress-row">
            {[1, 2, 3, 4].map((n, i) => (
              <React.Fragment key={n}>
                <div className={`prog-step ${step >= n ? "active" : ""}`}>{n}</div>
                {i < 3 && <div className={`prog-line ${step > n ? "active" : ""}`} />}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="ngo-form">
           
            {step === 1 && (
  <div className="step-grid">
    <label>
      NGO Name *
      <input name="ngoName" value={form.ngoName} onChange={handleChange} />
      {errors.ngoName && <div className="field-error">{errors.ngoName}</div>}
    </label>

    <label>
      Registration Number *
      <input
        name="registrationNumber"
        value={form.registrationNumber}
        onChange={handleChange}
      />
      {errors.registrationNumber && (
        <div className="field-error">{errors.registrationNumber}</div>
      )}
    </label>

    <label>
      Email *
      <input name="email" value={form.email} onChange={handleChange} />
      {errors.email && <div className="field-error">{errors.email}</div>}
    </label>

    <label>
      Phone *
      <input name="phone" value={form.phone} onChange={handleChange} />
      {errors.phone && <div className="field-error">{errors.phone}</div>}
    </label>
  </div>
)}


            {step === 2 && (
              <div className="step-grid">
                <label className="full">
                  Address *
                  <textarea name="address" value={form.address} onChange={handleChange} />
                  {errors.address && <div className="field-error">{errors.address}</div>}
                </label>

                <label>
                  City *
                  <input name="city" value={form.city} onChange={handleChange} />
                </label>
                <label>
    District *
    <input
      name="district"
      value={form.district}
      onChange={handleChange}
    />
  </label>

                <label>
                  State *
                  <input name="state" value={form.state} onChange={handleChange} />
                </label>

                <label>
                  Pincode *
                  <input name="pincode" value={form.pincode} onChange={handleChange} />
                </label>
              </div>
            )}

        
            {step === 3 && (
  <div className="step-grid">
    <label className="full">
      Account Holder Name *
      <input
        name="accountHolderName"
        value={form.accountHolderName}
        onChange={handleChange}
      />
      {errors.accountHolderName && (
        <div className="field-error">{errors.accountHolderName}</div>
      )}
    </label>

    <label>
      Bank Name *
      <input
        name="bankName"
        value={form.bankName}
        onChange={handleChange}
      />
      {errors.bankName && <div className="field-error">{errors.bankName}</div>}
    </label>

    <label>
      Bank Account *
      <input name="bankAccount" value={form.bankAccount} onChange={handleChange} />
      {errors.bankAccount && <div className="field-error">{errors.bankAccount}</div>}
    </label>

    <label>
      IFSC *
      <input name="ifsc" value={form.ifsc} onChange={handleChange} />
      {errors.ifsc && <div className="field-error">{errors.ifsc}</div>}
    </label>
  </div>
)}


            {step === 4 && (
              <div className="step-grid">
                <label className="full">
                  Description
                  <textarea name="description" value={form.description} onChange={handleChange} />
                </label>

              
  <label className="full">
    Categories *

    <div className="multi-select">
      <div
        className="multi-select-input"
        onClick={() => setCatOpen(!catOpen)}
      >
        {form.categories.length > 0
          ? form.categories.map(c => c.replace("_", " ")).join(", ")
          : "Select categories"}
        <span className="arrow">▾</span>
      </div>

      {catOpen && (
        <div className="multi-select-dropdown">
          {CATEGORY_OPTIONS.map((cat) => {
            const selected = form.categories.includes(cat);
            return (
              <div
                key={cat}
                className={`multi-select-item ${selected ? "selected" : ""}`}
                onClick={() => {
                  setForm(prev => ({
                    ...prev,
                    categories: selected
                      ? prev.categories.filter(c => c !== cat)
                      : [...prev.categories, cat]
                  }));
                }}
              >
                <span>{cat.replace("_", " ")}</span>
                {selected && <span className="check">✓</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>

    {errors.categories && (
      <div className="field-error">{errors.categories}</div>
    )}
  </label>


                <div className="preview-box">
                  <h4>Preview</h4>
                  <p><strong>{form.ngoName}</strong></p>
                  <p>{form.description || "No description yet"}</p>
                  <p>{form.city}, {form.state}</p>
                  {/* <p>Categories: {form.categories}</p> */}
                  <p>
  Categories:{" "}
  {form.categories.length > 0
    ? form.categories.map(c => c.replace("_", " ")).join(", ")
    : "None selected"}
</p>
                </div>
              </div>
            )}

            <div className="nav-buttons">
              {step > 1 && (
                <button type="button" className="btn secondary" onClick={prev}>
                  ← Back
                </button>
              )}

              {step < 4 && (
                <button type="button" className="btn primary" onClick={next}>
                  Continue →
                </button>
              )}

              {step === 4 && (
                <button type="submit" className="btn submit" disabled={submitting}>
                  {submitting ? "Saving..." : isEditMode ? "Update Profile" : "Save & Finish"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
