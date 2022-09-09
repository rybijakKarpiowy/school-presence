import { useState } from "react";
import "./App.css";

function App() {
	const [loading, setLoading] = useState<boolean>(false);
	const [presence, setPresence] = useState<Subject[] | null>(null);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);

		// const res = await fetch("http://localhost:8080", {
		const res = await fetch("https://school-presence-backend-production.up.railway.app/", {
			method: "POST",
			body: JSON.stringify({ email: e.target.email.value, password: e.target.password.value }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res.status === 200) {
			const data = await res.json();
			setPresence(data);
		} else {
			console.log(res.status);
			console.log(res.json());
		}

		setLoading(false);
	};

	return (
		<>
			<h1>Obecności szkolne!</h1>
			{loading ? (
				<p>Ładowanie...</p>
			) : presence ? (
				presence.map((item: Subject) => (
					<div key={item.subject} style={{ height: "fit-content", width: "fit-content" }}>
						<h3>
							{item.subject}: {item.percentage}%
						</h3>
					</div>
				))
			) : (
				<form onSubmit={(e) => handleSubmit(e)}>
					<label htmlFor="email">
						Email: <input type="email" id="email" name="email" />
					</label>
					<label htmlFor="password">
						Hasło: <input type="password" id="password" name="password" />
					</label>
					<button type="submit">Submit</button>
				</form>
			)}
		</>
	);
}

export default App;

interface Subject {
	subject: string;
	percentage: number;
}
