## export education to json

import json

formal_education = (
    [{"key": "ethz",
      "website": "https://www.ethz.ch/",
      "name": "ETH Zürich",
      "graduation-date": 2017,
      "media": "images/ethz.png", 
      "location": "Zurich, CH",
      "degree": "MSc in Applied Mathematics",
      "gpa": "5.2/6, 86%",
      "description":
      ["Focus in macroeconomics and statistics.",
       "Thesis in deep reinforcement learning at Disney with [Tensorflow](https://www.tensorflow.org).",
       "Degree completed while working four days a week at [ZKB](http://www.zkb.ch)."
      ]
    },
     {"key": "udem",
      "website": "http://www.umontreal.ca",
      "name": "University of Montreal",
      "graduation-date": 2012,
      "media": "images/udem.jpg",
      "location": "Montreal, CA",
      "degree": "MSc in Mathematics",
      "gpa": "4.1/4.3, 95%",
      "description":
      ["Lectures at [HEC](http://www.hec.ca), [McGill](http://www.mcgill.ca) and [Concordia](http://www.concordia.ca/)."
       "Thesis in statistics (Copulae) at [ETHZ](www.ethz.ch)."]
     },
     {"key": "epfl",
      "website": "http://www.epfl.ch/",
      "name": "EPFL",
      "graduation-date": 2010,
      "media": "images/epfl.jpg",
      "location": "Lausanne, CH",
      "degree": "BSc in Mathematics",
      "gpa": "5.41/6, 90% (*3rd* year)",
      "description":
      ["Focus on numerical analysis and probability."]}
    ])

with open("formal_education.json", "w") as f:
    json.dump(formal_education, f, indent=2, sort_keys=True,  separators=(',', ': '))

continuing_education = (
    [{"key": "cfa-level-one",
      "website": "https://www.cfainstitute.org/en/programs/cfa",
      "plateform": "CFA",
      "name": "CFA, Level 1",
      "graduation-date": 2018,
      "description":
      ["Completion of level one of the CFA program."]},
     {"key": "udacity-machinelearning",
      "website": "https://www.udacity.com/course/machine-learning-engineer-nanodegree--nd009t",
      "plateform": "Udacity",
      "name": "Machine Learning Nanodegree",
      "verification-link": "https://confirm.udacity.com/RQDM5LKG",
      "graduation-date": 2018,
      "description":
      ["Completion of lectures in machine learning, covering supervised, unsupervised and classical reinforcement learning.",
       "Capstone project in application of deep learning models in time series classification.",
       "[Github repository](https://github.com/davidpham87/machine-learning)"]},
     {"key": "udacity-deeplearning",
      "website": "https://www.udacity.com/course/deep-learning-nanodegree--nd101",
      "plateform": "Udacity",
      "name": "Deep Learning Nanodegree",
      "graduation-date": 2018,
      "verification-link": "https://confirm.udacity.com/VE6KKGFD",
      "description":
      ["Completion of 5 lectures in deep learning.",
       "[Github repository](https://github.com/davidpham87/deep-learning)",]},
     {"key": "coursera-deeplearning",
      "website": "https://www.deeplearning.ai/deep-learning-specialization/",
      "plateform": "Coursera",
      "verification-link": "https://coursera.org/verify/specialization/SV3CW5LCJK7T",
      "name": "deeplearning.ai",
      "graduation-date": 2018,
      "description":
      ["Completion of 5 courses in deep learning."]},
    {"key": "coursera-jhu",
      "website": "http://jhudatascience.org/",
      "plateform": "Coursera",
      "name": "Data Science Specialization",
     "verification-link": "https://www.coursera.org/account/accomplishments/specialization/HFXN4M9NZ6VQ",
      "graduation-date": 2014,
      "description":
      ["Completion of 9 lectures and a capstone project on applied statistics and [R](https://www.r-project.org/)."]}]
)

with open("continuing_education.json", "w") as f:
    json.dump(continuing_education, f, indent=2, sort_keys=True,  separators=(',', ': '))

languages = (
    [{"section": "French", "description": "Mother tongue"},
     {"section": "English",
      "description":
      ("TOEFL (107/120 in 2009). "
       "I have been working since 2012 in English speaking environments.")},
     {"section": "German",
      "description":
      ("Zwei sprachige Matura auf Deutsch (2007). I have been living in Zurich "
       "since 2012. I worked at the SNB for 8 months and the ZKB for 2.5 years, "
       "where the main working language is (Swiss) German.")},
     {"section": "Vietnamese",
      "description": "Spoken, but hardly practiced outside informal situations."}]
)

personality = (
    [{"section": "Authentic",
      "description":
      ("I am a really bad poker player, because I say what I think"
       "and I mean I say. Some would qualify me as a simple person, "
       "but by holding true to my values, I can enjoy solving "
       "problems and focusing on them.")},
     {"section": "Helpful",
      "description":
     ("I care about those who are near to me: my family, my colleagues, my friends. "
      "I try my best to support them in every action I take.")},
     {"section": "Sound",
      "description":
      ("This might be the most controversial qualifier. "
       "Nevertheless, I think it is important, now more than ever, "
       "for individuals to have opinions and be able to defend them, "
       "while being able to discuss and change their judgments. The "
       "speed at which information travels is faster than ever, and "
       "many platforms as well as influential personalities publicly "
       "support *alternative* facts. This situation requires "
       "individuals with critical thinking and able to defend their "
       "point of views are more needed than ever. ")}]
)

data_analysis = [
    {"section": "Mathematics",
     "description":
     ("This is most elegant and timeless skill I had the chance to "
      "culture. Thanks to my passion, I learned how to prove "
      "statements, construct counter-example, improve existing "
      "solutions and vulgarizing concepts. It also comes with an "
      "additional benefits of learning the Greek alphabet and not "
      "being afraid of formulas anymore. The downside is, as most "
      "mathematicians, I lost my ability to do simple arithmetic. ")},
    {"section": "Statistics",
     "description":
     ("With software engineering, this is the skills I developed "
      "late in my studies. It required a wonderful teacher in "
      "mathematical statistics for me to appreciate it. I completed "
      "a second master at [ETH](https://www.ethz.ch/en.html) to "
      "solidify my basis in traditional statistics. ")},
    {"section" : "Machine Learning",
     "description":
     ("This discipline is an interesting crossing betwen "
      "statistics, mathematics and programming. In contrast to "
      "statistics, we are more interested in the predictive power "
      "than parameter inference. The field created its own "
      "vocabulary for its application: supervised, unsupervised, "
      "reinforcement and deep learning. "
      "\n \n"
      "One project I really liked in the field was a personal "
      "project on artistic style transfer using deep learning. The "
      "aim was to combine two pictures, a content and a style "
      "picture, to create a new image which would keep the "
      "characteristic of both. My aim was to develop a general "
      "algorithm which could cope with any style and any content. "
      "In order to complete the project, I used Google "
      "[TPUs](https://cloud.google.com/tpu/) with all the attached "
      "requirements (data serialization, cloud storage and "
      "computing). ")
    }]


programming = (
    [{"section": "Languages",
      "description":
      ("I contributed professionally to projects in \n \n    - Clojure,"
       "\n    - Python,\n    - Matlab, \n    - R, "
       "\n    - groovy/Java.\n"
       "These projects were mainly task automation or data "
       "analysis. This led me to learn a different skill set than the "
       "typical software engineer, as simplicity, modular code and speed of "
       "development are emphasized compared to other types of projects. I love "
       "writing code in Clojure as it drastically reduces accidental "
       "complexity. ")},
     {"section": "Functional Programming",
      "description":
      ("Again a controversial claim: I fully embrace the functional "
       "programming model and avoid the object-oriented paradigm as much as "
       "possible. It implies that even though I could use objects and classes, "
       "I use other mechanism in the programming language to achieve "
       "modularity, encapsulation and reusability. For example, in python, I "
       "use modules to create namespace and rely on `collections.namedtuple` "
       "or dictionaries for data container. This leads to much simpler and "
       "readable code. This [video](https://www.youtube.com/watch?v=rI8tNMsozo0) by Rich Hickey, "
       "creator of Clojure, will do a better job to support my view. ")},
     {"section": "Tools",
      "description":
      ("I mainly used `emacs` which allows me code in all programming language "
       "with a single text editor. Thanks to it, I am extremely happy whenever "
       "I have to write text/code as the shortcuts and the ability to "
       "configure the editor with elisp allows me to automate many tasks. "
       "Obviously, I love working in a linux environment with a command line terminal."
      )},
     {"section": "Infrastructure",
      "description":
      ("I used and configured cloud virtual machines on with Google Cloud, "
       "AWS, Azure and Digital Ocean. The main purpose was to rent machines at "
       "discounted price to run deep learning models or to host webapps. I "
       "created scripts to launch and end the instances, and connected to the "
       "machines through `ssh` with emacs.")}]
)



skills = {
    "languages":
    {"title": "Languages",
     "subheader": "Because humor is still a better way to communicate between humans than binary code.",
     "sections": languages},
    "personality":
    {"title": "Personality",
     "subheader":
     ("Because we are more than our title, education or job. "
      "If we get the chance to meet, you will find that I am an authentic, "
      "helpful and sound (but fact-driven) individual."),
     "sections": personality},
    "programming":
    {"title": "Programming",
     "subheader": (
         "Programming languages aims to communicate with another human in a way a "
         "computer can understand"),
     "sections": programming},
    "data-analysis":
    {"title": "Data Analysis",
     "subheader": ("Because tools without creativity, ideas and "
                   "theory are not worth much."),
     "sections": data_analysis}}

with open("skills.json", "w") as f:
    json.dump(skills, f, indent=2, sort_keys=True,  separators=(',', ': '))
