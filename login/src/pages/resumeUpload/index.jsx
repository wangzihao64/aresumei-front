import React, { Component } from 'react'
import axios, { getToken } from '../../utils/request';

export default class ResumeUpload extends Component {
    state = {
        file: null,
        status: '',
        error: '',
        isUploading: false,
    }

    handleFileChange = e => {
        const file = e.target.files && e.target.files[0];
        this.setState({
            file: file || null,
            status: '',
            error: '',
        });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { file } = this.state;

        if (!file) {
            this.setState({ error: '请先选择要上传的简历文件。', status: '' });
            return;
        }

        const token = getToken();
        if (!token) {
            this.setState({ error: '请先登录后再上传简历。', status: '' });
            return;
        }

        const form = new FormData();
        form.append('file', file);

        this.setState({ isUploading: true, error: '', status: '' });

        try {
            const { data } = await axios.post('/api/v1/upload/resume', form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const message = data?.message || data?.msg || '简历上传成功。';
            this.setState({ status: message, error: '' });
        } catch (err) {
            const message = err.response?.data?.message || err.response?.data?.error || err.message || '简历上传失败，请稍后重试。';
            this.setState({ error: message, status: '' });
        } finally {
            this.setState({ isUploading: false });
        }
    }

    render() {
        const { file, status, error, isUploading } = this.state;

        return (
            <section className="upload-page" aria-labelledby="resume-upload-title">
                <div className="upload-shell">
                    <div className="upload-dialog" role="dialog" aria-labelledby="resume-upload-title" aria-describedby="resume-upload-desc">
                        <div className="upload-heading">
                            <span className="eyebrow">简历上传</span>
                            <h1 id="resume-upload-title">请上传简历</h1>
                        </div>

                        <form className="upload-form" onSubmit={this.handleSubmit}>
                            <label className={file ? 'upload-dropzone has-file' : 'upload-dropzone'} htmlFor="resumeFile">
                                <span className="upload-icon" aria-hidden="true">CV</span>
                                <span className="upload-copy">
                                    <strong>{file ? file.name : '选择简历文件'}</strong>
                                    <small>{file ? `${Math.ceil(file.size / 1024)} KB` : '支持 PDF、DOC、DOCX 格式'}</small>
                                </span>
                                <input
                                    id="resumeFile"
                                    name="file"
                                    type="file"
                                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    onChange={this.handleFileChange}
                                    aria-describedby="resume-upload-desc resume-file-help"
                                />
                            </label>

                            
                            {error && <div className="form-alert error" role="alert" aria-live="polite">{error}</div>}
                            {status && <div className="form-alert info" role="status">{status}</div>}

                            <button type="submit" className="primary-action" disabled={isUploading}>
                                {isUploading && <span className="button-spinner" aria-hidden="true"></span>}
                                {isUploading ? '上传中…' : '上传简历'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}
