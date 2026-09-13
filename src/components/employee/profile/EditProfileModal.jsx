
import { useMemo } from 'react';
import { Button, Form, Input, Modal, Tabs } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const inputCls =
    '!rounded-lg !border-[var(--line)] hover:!border-[var(--ink)] focus:!border-[var(--ink)]';

const EditProfileModal = ({ form, saving, onClose, onSave }) => {
    const items = useMemo(
        () => [
            {
                key: 'personal',
                label: 'Personal',
                children: (
                    <div className="grid gap-x-5 gap-y-2 pt-2 sm:grid-cols-2">
                        <Form.Item
                            label="Full name"
                            name="name"
                            rules={[
                                { required: true, message: 'Name is required' },
                            ]}
                        >
                            <Input className={inputCls} />
                        </Form.Item>
                        <Form.Item
                            label="Email address"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Email is required',
                                },
                                {
                                    type: 'email',
                                    message: 'Enter a valid email',
                                },
                            ]}
                        >
                            <Input className={inputCls} />
                        </Form.Item>
                        <Form.Item label="Phone number" name="phone">
                            <Input className={inputCls} />
                        </Form.Item>
                        <Form.Item
                            label="Avatar URL"
                            name="avatar"
                            rules={[
                                { type: 'url', message: 'Must be a valid URL' },
                            ]}
                        >
                            <Input
                                className={inputCls}
                                placeholder="https://…"
                            />
                        </Form.Item>
                    </div>
                ),
            },
            {
                key: 'service',
                label: 'Service',
                children: (
                    <div className="grid gap-x-5 gap-y-2 pt-2 sm:grid-cols-2">
                        <Form.Item label="Designation" name="designation">
                            <Input className={inputCls} />
                        </Form.Item>
                        <Form.Item
                            label="Current assignment"
                            name="currentAssignment"
                            className="sm:col-span-2"
                        >
                            <Input className={inputCls} />
                        </Form.Item>
                    </div>
                ),
            },
            {
                key: 'education',
                label: 'Education',
                children: (
                    <div className="grid gap-x-5 gap-y-2 pt-2 sm:grid-cols-2">
                        <Form.Item
                            label="Highest qualification"
                            name="highestQualification"
                        >
                            <Input className={inputCls} />
                        </Form.Item>
                        <Form.Item label="Specialization" name="specialization">
                            <Input className={inputCls} />
                        </Form.Item>
                        <Form.Item
                            label="Institution"
                            name="institution"
                            className="sm:col-span-2"
                        >
                            <Input className={inputCls} />
                        </Form.Item>
                    </div>
                ),
            },
        ],
        []
    );

    return (
        <Modal
            open
            centered
            destroyOnClose
            title={
                <span className="text-base font-bold text-[var(--ink)]">
                    Edit profile record
                </span>
            }
            footer={null}
            onCancel={onClose}
            width={640}
            styles={{
                header: {
                    borderBottom: '1px solid var(--line)',
                    paddingBottom: '14px',
                },
                content: { borderRadius: '16px' },
            }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onSave}
                className="pt-2"
            >
                <Tabs items={items} defaultActiveKey="personal" />

                <div className="mt-4 flex justify-end gap-3 border-t border-[var(--line)] pt-4">
                    <Button
                        icon={<CloseOutlined />}
                        onClick={onClose}
                        disabled={saving}
                        className="!rounded-lg !border-[var(--line)] !text-[var(--ink)]"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={saving}
                        icon={<CheckOutlined />}
                        className="!rounded-lg !border-0 !bg-[var(--ink)] !font-semibold !text-[var(--lime)] hover:!brightness-125"
                    >
                        Save changes
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default EditProfileModal;
