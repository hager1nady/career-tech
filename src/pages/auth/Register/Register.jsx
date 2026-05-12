import { useState } from "react";
import { supabase } from "../../../Lip/supabaseClient.js";
import styles from "./Register.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister(e) {
        e.preventDefault();

        // 🧠 clean inputs
        const cleanEmail = email.trim();
        const fullName = `${firstName} ${lastName}`.trim();

        // ❗ simple validation
        if (!cleanEmail || !password || !firstName || !lastName) {
            alert("Please fill all fields");
            return;
        }

        // create auth user
        const { data, error } = await supabase.auth.signUp({
            email: cleanEmail,
            password,
        });

        if (error) {
            alert(error.message);
            return;
        }

        // create profile in DB
        const { error: profileError } = await supabase
            .from("profiles")
            .insert({
                id: data.user?.id,
                full_name: fullName,
                role: "student",
                level: "junior",
            });

        if (profileError) {
            alert(profileError.message);
            return;
        }

        alert("Account created successfully 🎉");
    }

    return (
        <form
            onSubmit={handleRegister}
            className="min-vh-100 d-flex justify-content-center align-items-center bg-light"
        >
            <div
                className="card border-0 shadow-sm p-4"
                style={{ width: "420px", borderRadius: "14px" }}
            >
                <h2 className="fw-bold text-center mb-2" style={{ color: "#0d47a1" }}>
                    Create a new account
                </h2>

                <p className="text-center text-muted mb-4">
                    Join us and start your educational journey
                </p>

                {/* First + Last Name */}
                <div className="row">
                    <div className="col-6 mb-3">
                        <label className="form-label fw-semibold">First Name</label>
                        <input
                            type="text"
                            className={`form-control ${styles.customInput}`}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="col-6 mb-3">
                        <label className="form-label fw-semibold">Last Name</label>
                        <input
                            type="text"
                            className={`form-control ${styles.customInput}`}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                        type="email"
                        className={`form-control ${styles.customInput}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="form-label fw-semibold">Password</label>

                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control ${styles.customInput}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <span
                            className={`bg-white ${styles.inputGroupText}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>

                {/* Submit */}
                <button
                    className="btn w-100 text-white fw-semibold mb-3"
                    style={{ backgroundColor: "#0a3d6d", padding: "12px" }}
                >
                    Sign Up
                </button>

                <p className="text-center mb-0">
                    Already have an account?{" "}
                    <span className="fw-semibold text-primary">Log in</span>
                </p>
            </div>
        </form>
    );
}