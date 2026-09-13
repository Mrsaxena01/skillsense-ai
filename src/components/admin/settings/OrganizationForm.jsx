
import { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const OrganizationForm = ({ initialValues, onSave, saving }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    return (
        <Form form={form} layout="vertical" onFinish={onSave}>
            <div className="grid gap-x-5 sm:grid-cols-2">
                <Form.Item
                    label="Organization name"
                    name="organizationName"
                    rules={[{ required: true }]}
                >
                    <Input className="!rounded-lg !border-[var(--line)]" />
                </Form.Item>
                <Form.Item
                    label="Organization code"
                    name="organizationCode"
                    rules={[{ required: true }]}
                >
                    <Input className="!rounded-lg !border-[var(--line)]" />
                </Form.Item>
            </div>
            <Form.Item
                label="Contact email"
                name="contactEmail"
                rules={[{ required: true, type: 'email' }]}
            >
                <Input className="!rounded-lg !border-[var(--line)]" />
            </Form.Item>
            <Button
                htmlType="submit"
                loading={saving}
                icon={<SaveOutlined />}
                className="!rounded-lg !border-none !bg-[var(--ink)] !font-semibold !text-[var(--lime)]"
            >
                Save changes
            </Button>
        </Form>
    );
};

export default OrganizationForm;
