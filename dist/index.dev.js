"use strict";

var mentorModalVar = "<div id=\"mentorsModal\" class=\"modal fade\" role=\"dialog\">\n\t\t\t\t\t\t<div class=\"modal-dialog\">\n\t\t\t\t\t\t\t<div class=\"modal-content\">\n\t\t\t\t\t\t\t\t<div class=\"modal-header\">\n\t\t\t\t\t\t\t\t\t<h4 class=\"modal-title\">Select A Mentor</h4>\n\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\" id=\"closeMentorModalIcon\">\n\t\t\t\t\t\t\t\t\t\t&times;\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"modal-body\" id=\"mentorModalBody\"></div>\n\t\t\t\t\t\t\t\t<div class=\"modal-footer\">\n\t\t\t\t\t\t\t\t\t<button\n\t\t\t\t\t\t\t\t\t\ttype=\"button\"\n\t\t\t\t\t\t\t\t\t\tclass=\"btn btn-dark\"\n                                        data-dismiss=\"modal\"\n                                        id=\"closeMentorModal\"\n\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\tClose\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>";

var createStudent = function createStudent(body) {
  var url, response, data;
  return regeneratorRuntime.async(function createStudent$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = "https://assign-mentor-api.herokuapp.com/student";
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json"
            }
          }));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;
          console.log(data);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

var createMentor = function createMentor(body) {
  var url, response, data;
  return regeneratorRuntime.async(function createMentor$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          url = "https://assign-mentor-api.herokuapp.com/mentor";
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json"
            }
          }));

        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context2.sent;
          console.log(data);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var allocateMentor = function allocateMentor(mentorName, id) {
  var updateMentorUrl, body, response, data;
  return regeneratorRuntime.async(function allocateMentor$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          updateMentorUrl = "https://assign-mentor-api.herokuapp.com/student";
          body = {
            studentId: id,
            mentor: mentorName
          };
          _context3.next = 4;
          return regeneratorRuntime.awrap(fetch(updateMentorUrl, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json"
            }
          }));

        case 4:
          response = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context3.sent;
          console.log(data);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var assignMentor = function assignMentor(id) {
  var studentDetailUrl, updateMentorUrl, getMentorUrl, mentorsData, mentors, mentorModalBody, closeMentorModal, closeMentorModalIcon, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

  return regeneratorRuntime.async(function assignMentor$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          studentDetailUrl = "https://assign-mentor-api.herokuapp.com/student/".concat(id);
          updateMentorUrl = "https://assign-mentor-api.herokuapp.com/student";
          getMentorUrl = "https://assign-mentor-api.herokuapp.com/mentor";
          _context4.next = 5;
          return regeneratorRuntime.awrap(fetch(getMentorUrl));

        case 5:
          mentorsData = _context4.sent;
          _context4.next = 8;
          return regeneratorRuntime.awrap(mentorsData.json());

        case 8:
          mentors = _context4.sent;
          mentorModalBody = document.querySelector("#mentorModalBody");
          $("#mentorsModal").modal("show");
          $("#mentorsModal").on("hidden.bs.modal", function (e) {
            mentorModal.innerHTML = mentorModalVar;
          });
          closeMentorModal = document.querySelector("#closeMentorModal");
          closeMentorModal.addEventListener("click", function (e) {
            mentorModal.innerHTML = mentorModalVar;
          });
          closeMentorModalIcon = document.querySelector("#closeMentorModalIcon");
          closeMentorModalIcon.addEventListener("click", function (e) {
            mentorModal.innerHTML = mentorModalVar;
          });
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context4.prev = 19;

          _loop = function _loop() {
            var data = _step.value;
            var mentorButton = document.createElement("button");
            mentorButton.classList.add("addMentorButton");
            mentorButton.classList.add("btn", "btn-dark", "w-100", "mt-2");
            mentorButton.setAttribute("data-name", data.name);
            mentorButton.innerText = data.name;
            mentorModalBody.appendChild(mentorButton);
            mentorButton.addEventListener("click", function (e) {
              allocateMentor(mentorButton.dataset.name, id);
            });
          };

          for (_iterator = mentors[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop();
          }

          _context4.next = 28;
          break;

        case 24:
          _context4.prev = 24;
          _context4.t0 = _context4["catch"](19);
          _didIteratorError = true;
          _iteratorError = _context4.t0;

        case 28:
          _context4.prev = 28;
          _context4.prev = 29;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 31:
          _context4.prev = 31;

          if (!_didIteratorError) {
            _context4.next = 34;
            break;
          }

          throw _iteratorError;

        case 34:
          return _context4.finish(31);

        case 35:
          return _context4.finish(28);

        case 36:
          document.querySelectorAll(".addMentorButton").forEach(function (e) {
            return e.addEventListener("click", function () {
              // Here, `this` refers to the element the event was hooked on
              allocateMentor(this.dataset.name);
            });
          });

        case 37:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[19, 24, 28, 36], [29,, 31, 35]]);
};

var getStudents = function getStudents() {
  var url, response, data, tbody, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop2, _iterator2, _step2;

  return regeneratorRuntime.async(function getStudents$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          url = "https://assign-mentor-api.herokuapp.com/student";
          _context5.next = 3;
          return regeneratorRuntime.awrap(fetch(url));

        case 3:
          response = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context5.sent;
          console.log(data);
          tbody = document.querySelector("#assignMentortbody");
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context5.prev = 12;

          _loop2 = function _loop2() {
            var a = _step2.value;
            var tr = document.createElement("tr");
            var studentId = document.createElement("td");
            studentId.innerText = a.studentId;
            var name = document.createElement("td");
            name.innerText = a.name;
            var batch = document.createElement("td");
            batch.innerText = a["class"];
            var age = document.createElement("td");
            age.innerText = a.age;
            var changer = document.createElement("td");
            var mentor = document.createElement("td");
            if (a.mentor === null || a.mentor === undefined) mentor.innerText = "Not Assigned";else mentor.innerText = a.mentor;
            tr.appendChild(studentId);
            tr.appendChild(name);
            tr.appendChild(batch);
            tr.appendChild(age);
            tr.appendChild(mentor);
            tr.appendChild(changer);
            var mentorChange = document.createElement("button");
            mentorChange.classList.add("mentorChangeButton");
            mentorChange.classList.add("btn", "btn-dark");
            mentorChange.innerText = "Assign/Update Mentor";
            mentorChange.setAttribute("data-id", a.studentId);
            changer.appendChild(mentorChange);
            tbody.appendChild(tr);
            var mentorModal = document.createElement("div");
            mentorModal.innerHTML = mentorModalVar;
            var assingMentorSection = document.querySelector("#assignMentorSection");
            assingMentorSection.appendChild(mentorModal);
            mentorChange.addEventListener("click", function (e) {
              e.preventDefault();
              assignMentor(mentorChange.dataset.id);
            });
            document.querySelectorAll(".mentorChangeButton").forEach(function (e) {
              return e.addEventListener("click", function () {
                // Here, `this` refers to the element the event was hooked on
                console.log("clicked");
              });
            });
          };

          for (_iterator2 = data[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            _loop2();
          }

          _context5.next = 21;
          break;

        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5["catch"](12);
          _didIteratorError2 = true;
          _iteratorError2 = _context5.t0;

        case 21:
          _context5.prev = 21;
          _context5.prev = 22;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 24:
          _context5.prev = 24;

          if (!_didIteratorError2) {
            _context5.next = 27;
            break;
          }

          throw _iteratorError2;

        case 27:
          return _context5.finish(24);

        case 28:
          return _context5.finish(21);

        case 29:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[12, 17, 21, 29], [22,, 24, 28]]);
};

(function _callee3() {
  var addStudent, addMentor;
  return regeneratorRuntime.async(function _callee3$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          addStudent = document.querySelector(".addStudent");
          addStudent.addEventListener("click", function _callee(e) {
            var id, name, batch, age, data;
            return regeneratorRuntime.async(function _callee$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    e.preventDefault();
                    id = document.getElementById("studentId").value;
                    name = document.getElementById("studentName").value;
                    batch = document.getElementById("studentClass").value;
                    age = document.getElementById("studentAge").value;
                    data = {
                      studentId: parseInt(id),
                      name: name,
                      "class": batch,
                      age: age
                    };
                    console.log(data);
                    _context6.next = 9;
                    return regeneratorRuntime.awrap(createStudent(data));

                  case 9:
                    $(document).ready(function () {
                      $(".studentToast").toast("show");
                    });
                    document.getElementById("addStudentForm").reset();

                  case 11:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          });
          addMentor = document.querySelector(".addMentor");
          addMentor.addEventListener("click", function _callee2(e) {
            var id, name, subject, age, data;
            return regeneratorRuntime.async(function _callee2$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    e.preventDefault();
                    id = document.getElementById("mentorId").value;
                    name = document.getElementById("mentorName").value;
                    subject = document.getElementById("mentorSubject").value;
                    age = document.getElementById("mentorAge").value;
                    data = {
                      mentorId: parseInt(id),
                      name: name,
                      subject: subject,
                      age: age
                    };
                    console.log(data);
                    _context7.next = 9;
                    return regeneratorRuntime.awrap(createMentor(data));

                  case 9:
                    $(document).ready(function () {
                      $(".mentorToast").toast("show");
                    });
                    document.getElementById("addMentorForm").reset();

                  case 11:
                  case "end":
                    return _context7.stop();
                }
              }
            });
          });
          getStudents();

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  });
})();