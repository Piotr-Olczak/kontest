import React from 'react';
import classNames from 'classnames';
import { RegisterStepsShape } from 'interfaces/register/register';

const registerSteps = [
  {
    no: 1,
    name: 'Twoje dane'
  },
  {
    no: 2,
    name: 'Zgody prawne'
  },
  {
    no: 3,
    name: 'Oświadczenia'
  }
];

const RegisterSteps: React.FC<RegisterStepsShape> = props => {
  const { currentStep } = props;
  const registerStepsClassNames = classNames({
    'register-steps': true,
    'register-steps--completed': currentStep === 4
  });
  return (
    <ul className={registerStepsClassNames}>
      {registerSteps.map((step, index) => {
        const stepItemClassName = classNames({
          'register-steps__step': true,
          'register-steps__step--active': step.no <= currentStep
        });
        return (
          <li key={index} className={stepItemClassName}>
            <span className="register-steps__step-label">{step.name}</span>
            <span className="register-steps__step-no">{step.no}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default RegisterSteps;
