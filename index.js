$(".nav-link").on("click", function () {
	$(".navbar-collapse").collapse("hide");
});

const mentorModalVar = `<div id="mentorsModal" class="modal fade" role="dialog">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<h4 class="modal-title">Select A Mentor</h4>
									<button type="button" class="close" data-dismiss="modal" id="closeMentorModalIcon">
										&times;
									</button>
								</div>
								<div class="modal-body" id="mentorModalBody"></div>
								<div class="modal-footer">
									<button
										type="button"
										class="btn btn-dark"
                                        data-dismiss="modal"
                                        id="closeMentorModal"
									>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>`;

const studentModalVar = `<div id="studentsModal" class="modal fade" role="dialog">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<h4 class="modal-title">Select Student</h4>
									<button type="button" class="close" data-dismiss="modal" id="closeMentorModalIcon">
										&times;
									</button>
								</div>
								<div class="modal-body" id="studentModalBody"></div>
								<div class="modal-footer">
									<button
										type="button"
										class="btn btn-dark"
                                        data-dismiss="modal"
                                        id="closeMentorModal"
									>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>`;

const createStudent = async (body) => {
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

const createMentor = async (body) => {
	let url = "https://assign-mentor-api.herokuapp.com/mentor";

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

const allocateMentor = async (mentorName, id) => {
	console.log(mentorName, id);
	let updateMentorUrl =
		"https://assign-mentor-api.herokuapp.com/student/update";

	let body = {
		studentId: parseInt(id),
		mentor: mentorName,
	};
	console.log(body);

	const response = await fetch(updateMentorUrl, {
		method: "PATCH",
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
		},
	});

	let data = await response.json();
	window.location.reload();
	console.log(data);
};

const allocateStudent = async (mentorName, id) => {
	console.log(mentorName, id);
	let updateMentorUrl =
		"https://assign-mentor-api.herokuapp.com/student/update";

	let body = {
		studentId: parseInt(id),
		mentor: mentorName,
	};
	console.log(body);

	const response = await fetch(updateMentorUrl, {
		method: "PATCH",
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
		},
	});

	let data = await response.json();
	window.location.reload();
	console.log(data);
};

const createMentorModal = async (id) => {
	let getMentorUrl = "https://assign-mentor-api.herokuapp.com/mentor";

	const mentorsData = await fetch(getMentorUrl);

	const mentors = await mentorsData.json();

	let mentorModalBody = document.querySelector("#mentorModalBody");

	mentorModalBody.innerHTML = "";

	for (let data of mentors) {
		let mentorButton = document.createElement("button");

		mentorButton.classList.add("addMentorButton");

		mentorButton.classList.add("btn", "btn-dark", "w-100", "mt-2");

		mentorButton.setAttribute("data-name", data.name);

		mentorButton.innerText = data.name;

		mentorModalBody.appendChild(mentorButton);
	}

	document.querySelectorAll(".addMentorButton").forEach((e) =>
		e.addEventListener("click", function () {
			// Here, `this` refers to the element the event was hooked on
			console.log(this.dataset.name);
			allocateMentor(this.dataset.name, id);
		})
	);
};

const createStudentModal = async (id) => {
	let getStudentUrl = "https://assign-mentor-api.herokuapp.com/student";

	const studentData = await fetch(getStudentUrl);

	const student = await studentData.json();

	let studentModalBody = document.querySelector("#studentModalBody");

	studentModalBody.innerHTML = "";

	for (let data of student) {
		if (data.mentor === null) {
			let studentButton = document.createElement("button");

			studentButton.classList.add("addStudentButton");

			studentButton.classList.add("btn", "btn-dark", "w-100", "mt-2");

			studentButton.setAttribute("data-name", data.name);

			studentButton.innerText = data.name;

			studentModalBody.appendChild(studentButton);
		}
	}

	document.querySelectorAll(".addStudentButton").forEach((e) =>
		e.addEventListener("click", function () {
			// Here, `this` refers to the element the event was hooked on
			console.log(this.dataset.name);
			allocateStudent(this.dataset.name, id);
		})
	);
};

const assignMentor = async (id) => {
	console.log(id);

	createMentorModal(id);

	$("#mentorsModal").modal("show");
};

const assignStudent = async (id) => {
	console.log(id);

	createStudentModal(id);

	$("#studentsModal").modal("show");
};

const getStudents = async () => {
	let url = "https://assign-mentor-api.herokuapp.com/student";

	const response = await fetch(url);

	let data = await response.json();

	let tbody = document.querySelector("#assignMentortbody");

	for (let a of data) {
		let tr = document.createElement("tr");

		let studentId = document.createElement("td");
		studentId.innerText = a.studentId;

		let name = document.createElement("td");
		name.innerText = a.name;

		let batch = document.createElement("td");
		batch.innerText = a.class;

		let age = document.createElement("td");
		age.innerText = a.age;

		let changer = document.createElement("td");

		let mentor = document.createElement("td");

		if (a.mentor === null || a.mentor === undefined)
			mentor.innerText = "Not Assigned";
		else mentor.innerText = a.mentor;

		tr.appendChild(studentId);
		tr.appendChild(name);
		tr.appendChild(batch);
		tr.appendChild(age);
		tr.appendChild(mentor);
		tr.appendChild(changer);

		let mentorChange = document.createElement("button");
		mentorChange.classList.add("mentorChangeButton");
		mentorChange.classList.add("btn", "btn-dark");
		mentorChange.innerText = "Assign/Update Mentor";
		mentorChange.setAttribute("data-id", a.studentId);

		changer.appendChild(mentorChange);

		tbody.appendChild(tr);

		let mentorModal = document.createElement("div");
		mentorModal.classList.add("modalMentorElement");
		mentorModal.innerHTML = mentorModalVar;

		let assingMentorSection = document.querySelector("#assignMentorSection");
		assingMentorSection.appendChild(mentorModal);
	}

	document.querySelectorAll(".mentorChangeButton").forEach((e) =>
		e.addEventListener("click", function () {
			assignMentor(this.dataset.id);
		})
	);
};

const getMentors = async () => {
	let url = "https://assign-mentor-api.herokuapp.com/mentor";

	const response = await fetch(url);

	let data = await response.json();

	let tbody = document.querySelector("#assignStudentbody");

	for (let a of data) {
		let tr = document.createElement("tr");

		let studentId = document.createElement("td");
		studentId.innerText = a.mentorId;

		let name = document.createElement("td");
		name.innerText = a.name;

		let batch = document.createElement("td");
		batch.innerText = a.subject;

		let age = document.createElement("td");
		age.innerText = a.age;

		let count = document.createElement("td");
		count.innerText = a.students.length;

		let changer = document.createElement("td");

		tr.appendChild(studentId);
		tr.appendChild(name);
		tr.appendChild(batch);
		tr.appendChild(age);
		tr.appendChild(count);
		tr.appendChild(changer);

		let mentorChange = document.createElement("button");
		mentorChange.classList.add("studentChangeButton");
		mentorChange.classList.add("btn", "btn-dark");
		mentorChange.innerText = "Add Students";
		mentorChange.setAttribute("data-id", a.studentId);

		changer.appendChild(mentorChange);

		tbody.appendChild(tr);

		let studentModal = document.createElement("div");
		studentModal.classList.add("modalStudentElement");
		studentModal.innerHTML = studentModalVar;

		let assingStudentSection = document.querySelector("#assignStudentSection");
		assingStudentSection.appendChild(studentModal);
	}

	document.querySelectorAll(".studentChangeButton").forEach((e) =>
		e.addEventListener("click", function () {
			assignStudent(this.dataset.id);
		})
	);
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
			$(".studentToast").toast("show");
		});
		document.getElementById("addStudentForm").reset();
	});

	let addMentor = document.querySelector(".addMentor");
	addMentor.addEventListener("click", async (e) => {
		e.preventDefault();
		let id = document.getElementById("mentorId").value;
		let name = document.getElementById("mentorName").value;
		let subject = document.getElementById("mentorSubject").value;
		let age = document.getElementById("mentorAge").value;

		let data = {
			mentorId: parseInt(id),
			name: name,
			subject: subject,
			age: age,
		};
		console.log(data);
		await createMentor(data);
		$(document).ready(function () {
			$(".mentorToast").toast("show");
		});
		document.getElementById("addMentorForm").reset();
	});

	getStudents();
	getMentors();
})();
