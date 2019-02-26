import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

import EditableItemHeader from './elements/EditableItemHeader';
import EmptyContent from './elements/EmptyContent';
import SwitchContent from './elements/SwitchContent';
import FormControls from './elements/FormControls';


function FullName({
  fullName,
  visibility,
  editMode,
  onEdit,
  onChange,
  onCancel,
  saveState,
  onSubmit,

}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit('fullName');
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ name, value });
  };
  const handleClickCancel = () => {
    onCancel('fullName');
  };
  return (
    <SwitchContent
      className="mb-4"
      expression={editMode}
      cases={{
        editing: (
          <Form onSubmit={handleSubmit} onChange={handleChange}>
            <FormGroup>
              <Label for="fullName">Full Name</Label>
              <Input type="text" name="fullName" defaultValue={fullName} />
            </FormGroup>
            <FormControls
              saveState={saveState}
              onCancel={onCancel} 
              visibility={visibility}
              visibilityName="visibility.fullName"
            />
          </Form>
        ),
        editable: (
          <React.Fragment>
            <EditableItemHeader
              content="Full Name"
              showEditButton
              onClickEdit={() => onEdit('fullName')}
              showVisibility={Boolean(fullName)}
              visibility={visibility}
            />
            <h5>{fullName}</h5>
          </React.Fragment>
        ),
        empty: (
          <EmptyContent onClick={() => onEdit('fullName')}>Add name</EmptyContent>
        ),
        static: (
          <React.Fragment>
            <EditableItemHeader content="Full Name" />
            <h5>{fullName}</h5>
          </React.Fragment>
        ),
      }}
    />
  );
}


FullName.propTypes = {
  editMode: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  saveState: PropTypes.string,
  fullName: PropTypes.string,
  visibility: PropTypes.oneOf(['private', 'all_users']),
};

FullName.defaultProps = {
  editMode: 'static',
  saveState: null,
  fullName: null,
  visibility: 'private',
};


export default FullName;
