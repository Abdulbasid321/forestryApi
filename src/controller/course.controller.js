const Course = require('../model/Course');
const Student = require('../model/Student');
// Create a course
exports.createCourse = async (req, res) => {
  try {
    const { courseCode, courseTitle, creditUnits, lecturer, level, semester, department } = req.body;

    if (!courseCode || !courseTitle || !creditUnits || !lecturer || !level || !semester || !department) {
      return res.status(400).json({ message: 'All fields are required' });
    } 

    const existingCourse = await Course.findOne({ courseCode });
    if (existingCourse) {
      return res.status(409).json({ message: 'Course code already exists' });
    }

    const course = new Course({ courseCode, courseTitle, creditUnits, lecturer, level, semester, department });
    await course.save();

    const populated = await course.populate([
      { path: 'lecturer', select: 'fullName email' },
      { path: 'department', select: 'name' }
    ]);

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('lecturer', 'fullName email')
      .populate('department', 'name');

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('lecturer', 'fullName email')
      .populate('department', 'name');

    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update course by ID
exports.updateCourse = async (req, res) => {
  try {
    const { courseCode, courseTitle, creditUnits, lecturer, level, semester, department } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (courseCode && courseCode !== course.courseCode) {
      const existing = await Course.findOne({ courseCode });
      if (existing) return res.status(409).json({ message: 'Course code already exists' });
      course.courseCode = courseCode;
    }

    course.courseTitle = courseTitle ?? course.courseTitle;
    course.creditUnits = creditUnits ?? course.creditUnits;
    course.lecturer = lecturer ?? course.lecturer;
    course.level = level ?? course.level;
    course.semester = semester ?? course.semester;
    course.department = department ?? course.department;

    await course.save();

    const populated = await course.populate([
      { path: 'lecturer', select: 'fullName email' },
      { path: 'department', select: 'name' }
    ]);

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get courses for a specific student
// exports.getStudentCourses = async (req, res) => {
//   try {
//     const studentId = req.params.id;

//     const student = await Student.findById(studentId);
//     console.log("Full student object:", student);
//     if (!student) return res.status(404).json({ error: 'Student not found' });

//     // Log for debugging
//     console.log('Student:', {
//       department: student.departmentId,
//       level: student.currentLevel,
//       semester: student.semester,
//     });

//     // Fetch matching courses
//    const courses = await Course.find({
//   department: student.departmentId, // ✅ use correct field name
//   level: student.currentLevel,
//   semester: student.semester,
// }).populate('lecturer', 'fullName email');
// populate('lecturer', 'fullName email');

//     res.json(courses);
//   } catch (error) {
//     console.error('Error fetching student courses:', error);
//     res.status(500).json({ error: 'Server Error: ' + error.message });
//   }
// };
exports.getStudentCourses = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    console.log('Full student object:', student);

    // Use semester as-is from DB: '1st' or '2nd'
    const courses = await Course.find({
      department: student.departmentId, // match Course's "department"
      level: student.currentLevel,
      semester: student.semester, // ✅ Use '1st' or '2nd'
    })
      .populate('lecturer', 'fullName email')
      .populate('department', 'name');

    if (courses.length === 0) {
      return res.status(200).json({ message: 'No courses found for this semester.', courses: [] });
    }

    res.json({ courses });
  } catch (error) {
    console.error('Error in getStudentCourses:', error.message);
    res.status(500).json({ error: error.message });
  }
};