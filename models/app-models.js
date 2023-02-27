const { report } = require("../app/app");
const { Mushroom, Report } = require("../db/models/model");
const ObjectId = require("mongoose").Types.ObjectId;

exports.fetchMushrooms = () => {
  return Mushroom.find({}).then((mushrooms) => {
    return mushrooms;
  });
};

exports.fetchReports = () => {
  return Report.find({}).then((reports) => {
    return reports;
  });
};

exports.fetchReport = (report_id) => {
  if (!ObjectId.isValid(report_id)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  return Report.find({ _id: report_id }).then((report) => {
    if (report.length === 0) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return report;
  });
};

exports.fetchMushroomByName = (name) => {
  return Mushroom.find({ commonName: name }).then((mushroom) => {
    if (!mushroom.length) {
      return Promise.reject({ status: 400, msg: "Bad request" });
    }
    return mushroom;
  });
};

exports.insertReport = (report) => {
  const keys = ["location", "img_url", "username", "time_stamp", "species"];

  const greenlight = keys.every((key) => {
    return report.hasOwnProperty(key);
  });

  if (greenlight) {
    report.credibility = 100;
    report.alternate_species = [report.species];

    const newReport = new Report(report);
    return newReport.save();
  } else {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
};

exports.updateReport = (report_id, suggestedSpecies) => {
  if (!ObjectId.isValid(report_id)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return Mushroom.find({ commonName: suggestedSpecies })
    .then((mushroom) => {
      if (!mushroom.length) {
        return Promise.reject({ status: 400, msg: "Bad request" });
      }
    })
    .then(() => {
      return Report.find({ _id: report_id })
        .then((report) => {
          return report[0];
        })
        .then((report) => {
          const prevSuggested = report.alternate_species.some(({ species }) => {
            return species === suggestedSpecies;
          });

          if (prevSuggested) {
            report.alternate_species.forEach(({ species }, index) => {
              if (species === suggestedSpecies) {
                report.alternate_species[index].votes += 1;
              }
            });
          } else {
            report.alternate_species.push({
              species: suggestedSpecies,
              votes: 1,
            });
          }

          let totalVotes = 0;
          let topVoted = { votes: 0 };

          report.alternate_species.forEach(({ species, votes }) => {
            totalVotes += votes;
            if (votes > topVoted.votes) {
              topVoted = { species, votes };
            }
          });
          const credibility = Math.floor((topVoted.votes / totalVotes) * 100);

          return Report.findByIdAndUpdate(
            report_id,
            {
              alternate_species: [...report.alternate_species],
              species: topVoted,
              credibility,
            },
            { new: true }
          ).then((updatedReport) => {
            return updatedReport;
          });
        });
    });
};

exports.removeReport = (report_id) => {
  if (!ObjectId.isValid(report_id)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return Report.findByIdAndDelete(report_id).then((deletedReport) => {
    return deletedReport;
  });
};
