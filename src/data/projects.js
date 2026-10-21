// `match` lists skill names (lowercase) that light up this project when hovered in Skills.
// `visual` picks the small illustration: 'scatter' | 'seats' | 'meals'.
export const projects = [
  {
    title: 'Loan Default Prediction',
    tag: 'Machine Learning',
    kind: 'Machine learning model that predicts loan default',
    visual: 'scatter',
    summary: 'A machine learning model that predicts whether a borrower will default, built from borrower information.',
    tools: ['Python', 'Machine Learning', 'Feature Engineering'],
    match: ['python', 'machine learning', 'data science', 'data cleaning', 'feature engineering', 'feature selection', 'predictive modelling', 'data engineering'],
    points: [
      'Developed a machine learning model to predict loan default using borrower information.',
      'Performed data cleaning, preprocessing and feature engineering on financial datasets to improve model accuracy.',
      'Selected important features to improve the model performance.',
    ],
  },
  {
    title: 'Airline Reservation System',
    tag: 'Desktop App',
    kind: 'Desktop airline booking application',
    visual: 'seats',
    summary: 'A desktop airline booking application with a database behind flight booking, cancellation and passenger records.',
    tools: ['Java', 'JDBC', 'MySQL'],
    match: ['java', 'jdbc', 'mysql', 'sql', 'dbms', 'object-oriented programming'],
    points: [
      'Developed an Airline Reservation System using Java for the application and JDBC for database connectivity.',
      'Implemented features like flight booking, cancellation and viewing flight details.',
      'Managed passenger and booking data using a database system.',
    ],
  },
  {
    title: 'AI Smart Meal Planner (BiteGenie)',
    shortTitle: 'AI Smart Meal Planner',
    tag: 'Web App',
    kind: 'AI meal planning platform for personalized meal plans and nutrition insights',
    visual: 'meals',
    summary: 'BiteGenie: an AI platform that generates personalized meal plans and nutrition insights.',
    tools: ['Next.js', 'React', 'MongoDB'],
    match: ['next.js', 'react', 'mongodb', 'javascript'],
    points: [
      'Developed a web application that helps users create personalized meal plans based on their food preferences.',
      'Built features for meal recommendations, nutrition tracking and grocery list generation.',
      'Improved user engagement through AI-generated meal plans tailored to dietary preferences and fitness goals.',
    ],
  },
]
