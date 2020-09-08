import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
//changed a lot 
const initialState = {
  basedin: '',
  recent: '',
  live: '',
  fave: '',
  //skills: '',
 // githubusername: '',
  bio: '',
  twitter: '',
  vsco: '',
  web: '',
  youtube: '',
  instagram: ''
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    basedin,
    recent, 
    live,
    fave,
    bio,
    /*
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    */
    twitter,
    vsco,
    web,
    /*
    facebook,
    linkedin,
    */
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">edit your profile</h1>
      <p className="lead">
       tell us a bit about yourself & your travels :) 
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
         {/*<div className="form-group">
         
          <select name="status" value={status} onChange={onChange}>
            <option>* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small> 
        </div>*/}

        <div className="form-group">
          <input
            type="text"
            placeholder="* B=based in"
            name="basedin"
            value={basedin}
            onChange={onChange}
          />
          <small className="form-text">
            city, country, or continent where you're based in. (or "wanderer" if no definite place)
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="most recent travel was to..."
            name="recent"
            value={recent}
            onChange={onChange}
          />
          <small className="form-text">
            any travel that you've done most recently. (yes, right now getting the mail counts) 
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="if I could live anywhere, I would live in…
            "
            name="live"
            value={live}
            onChange={onChange}
          />
          <small className="form-text">
            your dream city, town, country, etc. to live in. 
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="if I had to pick a favorite trip, it would be…"
            name="fave"
            value={fave}
            onChange={onChange}
          />
          <small className="form-text">
            we know picking favorites is hard! but if you had to choose...
          </small>
        </div>
        {/*   <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={onChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div> 
      
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={onChange}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        */}
        <div className="form-group">
          <textarea
            placeholder="your most cherished."
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <small className="form-text">what are some of your most cherished travels/adventures?
          </small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            share your other social network links!
          </button>
          <span>optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
              <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="youTube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fa fa-globe fa-2x" />
              <input
                type="text"
                placeholder="website URL"
                name="web"
                value={web}
                onChange={onChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fa fa-camera-retro fa-2x" />
              <input
                type="text"
                placeholder="vsco URL"
                name="vsco"
                value={vsco}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" value="submit" className="btn btn-primary my-1"/>
        <Link className="btn btn-light my-1" to="/dashboard">
          go back
        </Link>
      </form>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
