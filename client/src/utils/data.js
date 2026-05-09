export const ROLES = {
  "Data Analyst": {
    //icon:"📊",
    skills:["SQL","Excel","Python","Statistics","Data Visualization","Data Cleaning","Tableau","Power BI","R","Business Intelligence"],
    deps:{"Data Cleaning":["SQL"],"Data Visualization":["Data Cleaning","Excel"],"Tableau":["Data Visualization"],"Power BI":["Data Visualization"],"Business Intelligence":["SQL","Tableau"]},
    priorities:{"SQL":"HIGH","Python":"HIGH","Statistics":"HIGH","Data Cleaning":"HIGH","Excel":"MEDIUM","Data Visualization":"MEDIUM","Tableau":"MEDIUM","Power BI":"MEDIUM","R":"LOW","Business Intelligence":"LOW"},
    resources:{"SQL":"Mode Analytics, W3Schools SQL","Python":"Python.org, freeCodeCamp","Statistics":"Khan Academy Stats","Data Cleaning":"Kaggle courses","Tableau":"Tableau Public free training","Data Visualization":"Storytelling with Data (book)"}
  },
  "Web Developer": {
    //icon:"💻",
    skills:["HTML","CSS","JavaScript","React","Node.js","Git","REST APIs","TypeScript","Testing","Docker"],
    deps:{"CSS":["HTML"],"JavaScript":["HTML","CSS"],"React":["JavaScript"],"Node.js":["JavaScript"],"REST APIs":["JavaScript","Node.js"],"TypeScript":["JavaScript"],"Testing":["JavaScript"],"Docker":["Node.js"]},
    priorities:{"HTML":"HIGH","CSS":"HIGH","JavaScript":"HIGH","React":"HIGH","Git":"HIGH","Node.js":"MEDIUM","REST APIs":"MEDIUM","TypeScript":"MEDIUM","Testing":"LOW","Docker":"LOW"},
    resources:{"HTML":"MDN Web Docs","CSS":"CSS-Tricks, Flexbox Froggy","JavaScript":"javascript.info, Eloquent JS","React":"react.dev official docs","Node.js":"nodejs.org, The Odin Project","Git":"Oh My Git!, GitHub Learning Lab"}
  },
  "ML Engineer": {
    //icon:"🤖",
    skills:["Python","Linear Algebra","Statistics","Machine Learning","Deep Learning","PyTorch","Data Preprocessing","Feature Engineering","Model Deployment","MLOps"],
    deps:{"Machine Learning":["Python","Linear Algebra","Statistics"],"Deep Learning":["Machine Learning","PyTorch"],"Feature Engineering":["Data Preprocessing","Statistics"],"Model Deployment":["Machine Learning"],"MLOps":["Model Deployment"]},
    priorities:{"Python":"HIGH","Linear Algebra":"HIGH","Statistics":"HIGH","Machine Learning":"HIGH","Data Preprocessing":"HIGH","PyTorch":"MEDIUM","Deep Learning":"MEDIUM","Feature Engineering":"MEDIUM","Model Deployment":"LOW","MLOps":"LOW"},
    resources:{"Python":"fast.ai, Python Data Science Handbook","Linear Algebra":"3Blue1Brown (YouTube)","Machine Learning":"Andrew Ng's Coursera","Deep Learning":"fast.ai part 2","PyTorch":"pytorch.org tutorials","Data Preprocessing":"Kaggle micro-courses"}
  },
  "Product Manager": {
    //icon:"🎯",
    skills:["Product Strategy","User Research","Data Analysis","Roadmapping","Stakeholder Management","A/B Testing","SQL","Wireframing","Agile","Market Research"],
    deps:{"Roadmapping":["Product Strategy"],"A/B Testing":["Data Analysis","SQL"],"Stakeholder Management":["Product Strategy"],"Market Research":["User Research"]},
    priorities:{"Product Strategy":"HIGH","User Research":"HIGH","Data Analysis":"HIGH","Stakeholder Management":"HIGH","Roadmapping":"MEDIUM","A/B Testing":"MEDIUM","SQL":"MEDIUM","Wireframing":"MEDIUM","Agile":"LOW","Market Research":"LOW"},
    resources:{"Product Strategy":"Inspired by Marty Cagan","User Research":"Just Enough Research (book)","SQL":"Mode Analytics","Wireframing":"Figma free tier","A/B Testing":"Optimizely Academy"}
  },
  "DevOps Engineer": {
    //icon:"⚙️",
    skills:["Linux","Docker","Kubernetes","CI/CD","Terraform","AWS","Monitoring","Scripting","Security","Networking"],
    deps:{"Docker":["Linux"],"Kubernetes":["Docker"],"CI/CD":["Docker","Scripting"],"Terraform":["AWS","Scripting"],"Monitoring":["Linux","Docker"]},
    priorities:{"Linux":"HIGH","Docker":"HIGH","Scripting":"HIGH","AWS":"HIGH","CI/CD":"MEDIUM","Kubernetes":"MEDIUM","Terraform":"MEDIUM","Monitoring":"MEDIUM","Security":"LOW","Networking":"LOW"},
    resources:{"Linux":"Linux Journey, The Linux Command Line","Docker":"Docker official docs + play-with-docker","Kubernetes":"Kubernetes.io tutorials","AWS":"AWS Free Tier + Cloud Practitioner cert","Terraform":"HashiCorp Learn","Scripting":"Bash Guide for Beginners"}
  }
};

export const ALL_SKILLS = ["Python","JavaScript","SQL","HTML","CSS","React","Node.js","Git","Excel","Statistics","Machine Learning","Deep Learning","Data Visualization","Docker","Kubernetes","Linux","AWS","Tableau","Power BI","TypeScript","R","REST APIs","Agile","Wireframing","User Research","Product Strategy","Figma","Java","C++","PostgreSQL","MongoDB","Redux","GraphQL","Pandas","NumPy","PyTorch","TensorFlow","Terraform","Jenkins","Bash"];
