
import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { domainOptions, getSkillOptions } from '../../../services/courseCatalogService';

const levelOptions = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];

const CourseFormModal = ({ open, initialValues, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) form.setFieldsValue(initialValues || { level: 'Intermediate', durationHours: 8 });
  }, [open, initialValues, form]);

  const handleFinish = (values) => {
    onSubmit({ ...values, tags: [values.domain] });
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      title={<span className="text-base font-bold text-[var(--ink)]">{initialValues ? 'Edit course' : 'Add new course'}</span>}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={initialValues ? 'Save changes' : 'Add course'}
      destroyOnClose
      okButtonProps={{ className: '!bg-[var(--ink)] !border-0 !text-[var(--lime)] !font-semibold' }}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} className="pt-2">
        <Form.Item label="Course title" name="title" rules={[{ required: true, message: 'Title is required' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Skill this course covers" name="skillName" rules={[{ required: true, message: 'Skill is required' }]}>
          <Select
            showSearch
            options={getSkillOptions().map((s) => ({ value: s, label: s }))}
            placeholder="e.g. Python"
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Provider" name="provider" rules={[{ required: true, message: 'Provider is required' }]}>
            <Select options={[{ value: 'iGOT Karmayogi', label: 'iGOT Karmayogi' }, { value: 'NSSTA', label: 'NSSTA' }]} />
          </Form.Item>
          <Form.Item label="Domain" name="domain" rules={[{ required: true, message: 'Domain is required' }]}>
            <Select options={domainOptions.map((d) => ({ value: d, label: d }))} />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Level" name="level" rules={[{ required: true }]}>
            <Select options={levelOptions.map((l) => ({ value: l, label: l }))} />
          </Form.Item>
          <Form.Item label="Duration (hours)" name="durationHours" rules={[{ required: true }]}>
            <InputNumber min={1} max={200} className="w-full" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default CourseFormModal;