let createStudent = async (body) => {
	let url = "https://assign-mentor-api.herokuapp.com/student";

	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
		},
	});

	let data = await response.json();

	console.log(data);
};

(async () => {
	let addStudent = document.querySelector(".addStudent");
	addStudent.addEventListener("click", async (e) => {
		e.preventDefault();
		let id = document.getElementById("studentId").value;
		let name = document.getElementById("studentName").value;
		let batch = document.getElementById("studentClass").value;
		let age = document.getElementById("studentAge").value;

		let data = {
			studentId: parseInt(id),
			name: name,
			class: batch,
			age: age,
		};
		console.log(data);
		await createStudent(data);
		$(document).ready(function () {
			$("#myBtn").click(function () {
				$(".toast").toast("show");
			});
		});
	});
})();
