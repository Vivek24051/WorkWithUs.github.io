require("../models/database");
const Category = require("../models/Category");
const Job = require("../models/Job");

/**
 *
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Job.find({}).limit(limitNumber);
    const carpenter = await Job.find({ category: "carpenter" }).limit(
      limitNumber
    );
    const blacksmith = await Job.find({ category: "blacksmith" }).limit(
      limitNumber
    );
    const nurse = await Job.find({ category: "nurse" }).limit(limitNumber);

    const contract = { latest, blacksmith, carpenter, nurse };

    res.render("index", { title: "WorkWithUs", categories, contract });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 *
 * GET /
 * categoris
 */

exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);
    res.render("categories", { title: "WorkWithUs - categories", categories });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 *
 * GET /
 * categoris/id
 */

exports.exploreCategoriesById = async (req, res) => {
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Job.find({ category: categoryId }).limit(
      limitNumber
    );
    res.render("categories", {
      title: "WorkWithUs - categories",
      categoryById,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};
/**
 *
 * GET /
 * job:id
 */

exports.exploreJob = async (req, res) => {
  try {
    let jobId = req.params.id;

    const job = await Job.findById(jobId);

    res.render("job", { title: "WorkWithUs - Job", job });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 *
 * POST /
 * SEARCH
 */

exports.searchWork = async (req, res) => {
  // searchTerm

  try {
    let searchTerm = req.body.searchTerm;

    let job = await Job.find({
      $text: {
        $search: searchTerm,
        $diacriticSensitive: true,
      },
    });
    res.render("search", { title: "WorkWithUs - Search", job });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 *
 * GET /
 * explore-latest
 */

exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 20;
    const job = await Job.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render("explore-latest", { title: "WorkWithUs - Job", job });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 *
 * GET /
 * explore-random
 */

exports.exploreRandom = async (req, res) => {
  try {
    let count = await Job.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let job = await Job.findOne().skip(random).exec();

    res.render("explore-random", { title: "WorkWithUs - Job", job });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 *
 * GET /
 * Submit_JOb
 */

exports.submitJob = async (req, res) => {
  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");

  res.render("submit-job", {
    title: "WorkWithUs - Job",
    infoErrorsObj,
    infoSubmitObj,
  });
};

/**
 *
 * post /
 * Submit_JOb
 */

exports.submitJobOnPost = async (req, res) => {
  try {
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No files where uploaded.");
    } else {
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath =
        require("path").resolve("./") + "/public/uploads/' + newImageName";

      imageUploadFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });
    }

    const newJob = new Job({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName,
    });

    await newJob.save();

    req.flash("infoSubmit", "Job has been added.");
    res.redirect("submit-job");
  } catch (error) {
    req.flash("infoErrors", error);
    res.redirect("submit-job");
  }
};

// insert dyymy data

// async function insertDymmyJobData() {
//   try {
//     await Job.insertMany([
//       {
//         name: "carpenter",
//         description: `work description goes here`,
//         email: "workemail@vivek.co.ind",
//         ingredients: [
//           "1 level does this",
//           "1 level does this",
//           "1 level does this",
//         ],
//         category: "carpenter",
//         image: "work 1.jpg",
//       },
//       {
//         name: "blacksmith",
//         description: `work description goes here`,
//         email: "workemail@vivek.co.ind",
//         ingredients: [
//           "1 level does this",
//           "1 level does this",
//           "1 level does this",
//         ],
//         category: "blacksmith",
//         image: "work2.jpg",
//       },
//       {
//         name: "nurse",
//         description: `work description goes here`,
//         email: "workemail@vivek.co.ind",
//         ingredients: [
//           "1 level does this",
//           "1 level does this",
//           "1 level does this",
//         ],
//         category: "nurse",
//         image: "work 3.jpg",
//       },
//       {
//         name: "carpenter",
//         description: `work description goes here`,
//         email: "workemail@vivek.co.ind",
//         ingredients: [
//           "1 level does this",
//           "1 level does this",
//           "1 level does this",
//         ],
//         category: "carpenter",
//         image: "work 5.jpg",
//       },
//       {
//         name: "carpenter",
//         description: `work description goes here`,
//         email: "workemail@vivek.co.ind",
//         ingredients: [
//           "1 level does this",
//           "1 level does this",
//           "1 level does this",
//         ],
//         category: "carpenter",
//         image: "work 1.jpg",
//       },
//       {
//         name: "carpenter",
//         description: `work description goes here`,
//         email: "workemail@vivek.co.ind",
//         ingredients: [
//           "1 level does this",
//           "1 level does this",
//           "1 level does this",
//         ],
//         category: "carpenter",
//         image: "work 1.jpg",
//       },
//       {
//         name: "carpenter",
//         description: `work description goes here`,
//         email: "workemail@vivek.co.ind",
//         ingredients: [
//           "1 level does this",
//           "1 level does this",
//           "1 level does this",
//         ],
//         category: "carpenter",
//         image: "work 1.jpg",
//       },
//     ]);
//   } catch (error) {
//     console.log("err", +error);
//   }
// }

// insertDymmyJobData();
