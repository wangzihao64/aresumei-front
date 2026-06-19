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
                    <div className="upload-heading">
                        <span className="eyebrow">面试问题</span>
                        <h1 id="resume-upload-title">请上传简历</h1>
                        <p id="resume-upload-desc">上传后根据简历内容生成更贴合岗位经历的面试问题。</p>
                    </div>

                    <form className="upload-prompt" onSubmit={this.handleSubmit}>
                        <label className={file ? 'upload-dropzone has-file' : 'upload-dropzone'} htmlFor="resumeFile">
                            <span className="upload-copy">
                                <strong>{file ? file.name : '上传一份简历，开始生成面试问题'}</strong>
                                <small>{file ? `${Math.ceil(file.size / 1024)} KB · 可重新选择文件` : '支持 PDF、DOC、DOCX'}</small>
                            </span>
                            <span className="upload-icon" aria-hidden="true">
                                <span></span>
                            </span>
                            <input
                                id="resumeFile"
                                name="file"
                                type="file"
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={this.handleFileChange}
                                aria-describedby="resume-upload-desc"
                            />
                        </label>

                        <button type="submit" className="upload-submit" disabled={isUploading} aria-label="上传简历">
                            {isUploading ? (
                                <span className="button-spinner" aria-hidden="true"></span>
                            ) : (
                                <span aria-hidden="true">↑</span>
                            )}
                        </button>
                    </form>

                    {(error || status) && (
                        <div className="upload-feedback">
                            {error && <div className="form-alert error" role="alert" aria-live="polite">{error}</div>}
                            {status && <div className="form-alert info" role="status">{status}</div>}
                        </div>
                    )}

                    <div className="prompt-suggestions" aria-label="面试问题方向">
                        <span>项目经历追问</span>
                        <span>技术栈深挖</span>
                        <span>行为面试准备</span>
                        <span>岗位匹配分析</span>
                    </div>
                </div>
            </section>
        )
    }
}
