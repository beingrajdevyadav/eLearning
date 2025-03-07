console.log("👨‍💻 Jai Shree Shyam Baba ❤🙏");

// ---------------------------------------------- 
// Global Variables
// ---------------------------------------------- 
const TotalCourses = [];


// ---------------------------------------------- 
// Function To Fetch Data From data.json file
// ---------------------------------------------- 

async function fetchData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error("Network response was not ok!")
        }
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.log("There was a problem with fetch operation : ", error)
    }
}

// ---------------------------------------------- 
// Function To Remix Arrays 
// ----------------------------------------------
function remixData(arr) {
    let remixedArr = arr.slice();

    for (let i = remixedArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [remixedArr[i], remixedArr[j]] = [remixedArr[j], remixedArr[i]];
    };

    return remixedArr;
}

// ---------------------------------------------- 
// Function To Display Courses 
// ---------------------------------------------- 
function displayCourses(courses) {

    const coursesDiv = document.querySelector("#courses");
    let html = '';
    courses.forEach(course => {
        html += `
        <div class="course">
                <!-- header  -->
                <div class="course-header">
                    <h3>${course.course}</h3>
                    
                </div>
                <!-- body -->
                <div class="course-body">
                <hr>
                    <p>${course.courseDescription}</p>
                    <p> ${handleRatings(course.rating).outerHTML}</p>
                    <p class="cd"> <span><i class="fa-solid fa-clock-rotate-left"></i>  ${course.courseDuration.hours}hrs</span>
                        <span><i class="fa-solid fa-person-chalkboard"></i>  ${course.courseDuration.lectures} lectures</span>
                    </p>
                    <p>By ${course.instructor.name}</p>

                </div>
                <!-- footer -->
                <div class="course-footer">
                    <hr>
                    <div class="course-control">
                        <button class="view-course">View Course </button>
                        <button class="enroll-now">Enroll Now</button>
                    </div>

                </div>
            </div>
        `;
    });

    coursesDiv.innerHTML = html;

    // to enable view course button functionality after each renderings
    enableViewCourse(courses);
    enableEnrollNow(courses);
}

// ---------------------------------------------- 
// Function To Handle View Course Button
// ---------------------------------------------- 
function enableViewCourse(courses) {
    const viewCourseBtns = document.querySelectorAll(".view-course");
    const modal = document.getElementById("courseModal");
    const closeBtn = document.getElementById("closeModal");
    const activeCourse = document.getElementById("activeCourse");
    // console.log(viewCourseBtns);

    viewCourseBtns.forEach((btn, i) => {
        btn.addEventListener("click", function () {
            modal.style.display = "flex"; // to display course modal
            // console.log(courses[i]);
            let ui = createCourseUI(courses[i]);
            activeCourse.innerHTML = ui;
        });
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none"; // to hide course modal
    });

    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    })
}

// ---------------------------------------------- 
// Function To Generate Course Details / Report
// ----------------------------------------------
function createCourseUI(course) {
    let ui = `
                
                    <div class="ac-header">
                        <div>
                            <h2>🎯 ${course.course}</h2>
                            <hr>
                            <p> ${course.courseDescription} </p>
                        </div>

                        <div>
                            <ul>
                                <li> <b>Course Price :</b> ${course.coursePrice} Rs /- </li>
                                <li> <b>Course Duration :</b> ${course.courseDuration.hours} hours</li>
                                <li><b>Total Lectures :</b> ${course.courseDuration.lectures} lectures</li>
                            </ul>
                        </div>


                        <div>
                            <button>Enroll Now</button>
                        </div>
                    </div>
                    <div class="ac-body">

                        <div class="benefit">
                            <div class="icon"></div>
                            <h3>Unlock Your Potential</h3>
                            <p>this course is your gateway to mastering new skills and transforming your future. Start
                                learning today!</p>
                        </div>

                        <ul>
                            <li>Coding Challenges</li>
                            <li>Code Review System</li>
                            <li>Real-World Projects</li>
                            <li>Progress Tacking Dashboard</li>
                            <li>Code Snippet Library</li>
                            <li>Cloud-Based Code Editor</li>
                            <li> 24/7 Support Chatbot </li>
                        </ul>

                    </div>
                    <div class="ac-footer">
                        <hr>

                        <div class="instructor">
<div class="bio">
                                <img src="./media/${course.instructor.gender == "Male" ? "male" : "female"}.jpg" alt="">
                                <p>"Learning is not the product of teaching. <br> Learning is the product of the
                                    activity of
                                    learners." <br> - John Holt</p>
                                <h3>${course.instructor.name}</h3>
                            </div>

                            <div class="info">
                                <h3>About Your Instructor</h3>
                                <p>Get ready to learn from <b>${course.instructor.name}</b>  , a passionate expert in <b>${course.course}</b>  . Known for making
                                    complex
                                    topics simple and engaging, they are here to guide, inspire, and help you succeed.
                                    🎯🙌
                                </p>

                                <p>⛳ Let's dive in and make learning an exciting journey together! 👨‍💻 </p>

                            </div>

                            
                        </div>

                        <hr>
                    </div>
    `;

    return ui;
}

// ---------------------------------------------- 
// Function To Handle Enroll Button
// ---------------------------------------------- 

function enableEnrollNow(courses) {
    const enrollNowBtns = document.querySelectorAll(".enroll-now");
    const enrollModal = document.querySelector("#enrollModal");
    const closeModalBtn = document.querySelector("#closeEnrollModal");
    const activeEnroll = document.querySelector("#activeEnroll");

    enrollNowBtns.forEach((btn, i) => {
        btn.addEventListener("click", function () {
            enrollModal.style.display = "flex";
            let ui = createEnrollUI(courses[i]);
            activeEnroll.innerHTML = ui;
            enableCouponFunctionality(courses[i].coursePrice);
            // console.log(courses[i]);
        })
    })


    closeModalBtn.addEventListener("click", function () {
        enrollModal.style.display = "none";
    })

    window.addEventListener("click", function (e) {
        if (e.target === enrollModal) {
            enrollModal.style.display = "none";
        }
    })

}

// ---------------------------------------------- 
// Function To Create Enroll UI
// ---------------------------------------------- 
function createEnrollUI(course) {
    let ui = `
      <div class="ae-header">
                        <!-- Course Details -->
                        <h2>🎯 Course Details</h2>
                        <hr>
                        <div class="course-details">
                            <p><strong>Course : </strong><span id="courseName">${course.course}</span></p>
                            <p><strong>Instructor : </strong><span id="instructorName">${course.instructor.name}</span></p>
                            <p><strong>Price : </strong><span id="coursePrice">${course.coursePrice} Rs. /- </span></p>
                            <p><strong>Duration : </strong><span id="courseLectures">${course.courseDuration.hours} hours</span></p>
                            <p><strong>Lectures : </strong><span id="courseLectures">${course.courseDuration.lectures} lectures</span></p>
                            <p><strong>Students : </strong><span id="courseStudents">${course.rating.counts}</span></p>
                        </div>
                    </div>


                    <div class="ae-body">
                        <!-- Student Details -->
                        <div class="student-details">
                            <h3>Student Details</h3>
                            <hr>
                            <div id="enrollForm" class="enroll-form">
                                <div class="form-control">
                                    <label for="name"><i class="fa-solid fa-user-tie"></i> Name</label>
                                    <input type="text" id="name" placeholder="Enter Your Name" required
                                        autocomplete="off">
                                </div>

                                <div class="form-control">
                                    <label for="phone"><i class="fa-solid fa-phone"></i> Phone</label>
                                    <input type="tel" id="phone" placeholder="Enter Your Phone" required
                                        autocomplete="off">
                                </div>

                                <div class="form-control">
                                    <label for="email"><i class="fa-solid fa-at"></i> Email</label>
                                    <input type="email" id="email" placeholder="Enter Your Email" required
                                        autocomplete="off">
                                </div>
                                <div class="form-control">
                                    <label for="password"><i class="fa-solid fa-lock"></i> Password</label>
                                    <input type="password" id="password" placeholder="Create Login Password" required
                                        autocomplete="off">
                                </div>
                            </div>
                        </div>


                        <!-- Apply Coupon Code  -->
                        <div class="coupon-form">
                            <h3>Apply Coupon Code </h3>
                            <div class="form-control">
                                <input type="text" id="coupon" class="coupon" autocomplete="off" placeholder="Enter Coupon Code">
                                <button id="applyCoupon" class="btn">Apply</button>
                            </div>
                        </div>

                        <!-- Payment Details -->
                        <div id="paymentDetails" class="payment-details">
                            <h3>Payment Details</h3>
                            <hr>
                            <div class="payment-details">
                                <p><strong>Amount : </strong><span id="amount">${course.coursePrice} Rs. /-</span></p>
                                <p><strong>Discount : </strong><span id="discount">0 </span> Rs. /-</p>
                                <p><strong>Total : </strong><span id="total">${course.coursePrice} </span> Rs. /-</p>
                            </div>
                        </div>

                        <!-- Payment Gateway -->
                        <div id="paymentGateway">
                            <h3>Finish Payment</h3>
                            <hr>
                            <div class="amount"><span class="lg-txt" id="finalPrice"> ${course.coursePrice}</span> Rs. /- </div>

                            <p class="final-line">Education opens doors, but action makes the difference. Take the leap,
                                invest in yourself, and make your goals a reality! 🎯🙌</p>

                            <div class="payment-gateway">
                                <button id="submit" class="btn">Submit</button>
                            </div>
                        </div>
                    </div>
    `;

    return ui;
}

// ---------------------------------------------- 
// Function To Apply Coupon 
// ---------------------------------------------- 
function enableCouponFunctionality(price) {
    const coupons = {
        "LOVE10": 10,
        "SAVE20": 20,
        "DEAL30": 30,
        "OFFER40": 40,
        "MEGA50": 50
    }
    const applyBtn = document.querySelector("#applyCoupon");

    applyBtn.addEventListener("click", function () {
        const couponCode = document.querySelector("#coupon").value.toUpperCase();
        console.log(couponCode);
        // console.log(coupons[couponCode])
        if (coupons.hasOwnProperty(couponCode)) {
            let discount = ((coupons[couponCode] / 100) * price).toFixed(2);
            let finalPrice = (price - discount).toFixed(2);

            document.getElementById("discount").innerText = discount;
            document.getElementById("total").innerText = finalPrice;
            document.getElementById("finalPrice").innerText = finalPrice;

            this.innerText = "Applied 🎉";
document.getElementById("coupon").readOnly = true;
           
            
            // console.log(price, discount, finalPrice);
        }else{
            document.getElementById("coupon").value = "Invalid Coupon!"
        }
    })
}
// ---------------------------------------------- 
// Function To Search Courses 
// ---------------------------------------------- 
function searchCourses() {
    const search = document.querySelector("#searchInput").value;
    const searchResult = TotalCourses.filter(course => {
        return (
            course.course.toLowerCase().includes(search.toLowerCase()) ||
            course.courseDescription.toLowerCase().includes(search.toLowerCase()) ||
            course.instructor.name.toLowerCase().includes(search.toLowerCase())
        );
    });

    if (searchResult.length === 0) {

        document.querySelector("#courses").innerHTML = `       <div class="error-img">
        <img src="https://static.vecteezy.com/system/resources/previews/004/971/619/non_2x/man-work-computer-freelance-programmer-and-deadline-designer-late-with-execution-order-online-education-on-internet-vector.jpg" alt="">

        <h3>Something went wrong!</h3>
       </div>`;

        document.querySelector("#searchInput").value = '';
        return;
    }

    // console.log(searchResult);
    displayCourses(searchResult);
    document.querySelector("#searchInput").value = '';
}

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", searchCourses);

// ---------------------------------------------- 
// Function To Handle Rating UI
// ---------------------------------------------- 

function handleRatings(rating) {
    // Create a container div
    const container = document.createElement('div');
    container.style.display = 'inline-block';

    // Create stars
    const starsDiv = document.createElement('div');
    starsDiv.style.display = 'inline-block';
    starsDiv.style.fontSize = '20px';
    starsDiv.style.marginRight = '5px';
    const fullStars = Math.floor(rating.stars);
    const halfStar = rating.stars % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        if (i < fullStars) {
            star.innerHTML = `<i class="fa-solid fa-star"></i> `;  // Full star
            star.style.color = '#c4213c';
        } else if (halfStar && i === fullStars) {
            star.innerHTML = `<i class="fa-solid fa-star-half-stroke"></i> `;  // Half star, using empty star here for simplicity
            star.style.color = '#c4213c';
        } else {
            star.innerHTML = `<i class="fa-solid fa-star"></i> `;  // Empty star
            star.style.color = 'grey';
        }
        starsDiv.appendChild(star);
    }

    container.appendChild(starsDiv);

    // Create counts
    const countsSpan = document.createElement('span');
    countsSpan.innerHTML = `(${rating.counts})`;
    countsSpan.style.marginTop = '5px';
    countsSpan.style.fontSize = '12px';
    countsSpan.style.color = 'grey';

    container.appendChild(countsSpan);

    return container;
}




// ---------------------------------------------- 
// Function To Handle On window load
// ---------------------------------------------- 

window.addEventListener("load", function () {
    fetchData()
        .then(data => {
            // console.log(data);

            let printingData = remixData(data);
            printingData.forEach(course => {
                TotalCourses.push(course);
            });

            // console.log(printingData);
            displayCourses(printingData.slice(0, 9));
        })
})
