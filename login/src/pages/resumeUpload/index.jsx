import React, { Component } from 'react'
import axios, { getToken } from '../../utils/request';

export default class ResumeUpload extends Component {
    state = {
        file: null,
        resumeId: null,
        status: '',
        error: '',
        isUploading: false,
        backendResult: '',
    }

    isOkResponse = value => {
        return typeof value === 'string' && value.trim().toLowerCase() === 'ok';
    }

    buildResumeAnswerPayload = resumeId => {
        return resumeId ? { resume_id: resumeId } : {};
    }

    formatBackendResult = data => {
        const result = data?.data ?? data?.result ?? data?.questions ?? data?.answer ?? data;

        if (typeof result === 'string') {
            return this.isOkResponse(result) ? '' : result;
        }

        if (result == null) {
            return '';
        }

        try {
            const formatted = JSON.stringify(result, null, 2);
            return this.isOkResponse(formatted) ? '' : formatted;
        } catch (err) {
            const stringified = String(result);
            return this.isOkResponse(stringified) ? '' : stringified;
        }
    }

    handleFileChange = e => {
        const file = e.target.files && e.target.files[0];
        this.setState({
            file: file || null,
            status: '',
            error: '',
            backendResult: '',
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

        this.setState({ isUploading: true, error: '', status: '', backendResult: '' });

        try {
            const { data: uploadData } = await axios.post('/api/v1/upload/resume', form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const uploadMessage = uploadData?.message || uploadData?.msg || '';
            const uploadStatus = this.isOkResponse(uploadMessage) ? '' : (uploadMessage || '简历上传成功。');
            const resumeId = uploadData?.data?.resume_id ?? uploadData?.resume_id ?? null;

            const resumeAnswerPayload = this.buildResumeAnswerPayload(resumeId);
            const { data: answerData } = await axios.post('/api/v1/user/resume-answer', resumeAnswerPayload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const formattedResult = this.formatBackendResult(answerData);
            const answerMessage = answerData?.message || answerData?.msg || '';
            const statusText = this.isOkResponse(answerMessage) ? uploadStatus : (answerMessage || uploadStatus);

            this.setState({
                resumeId,
                status: statusText,
                error: '',
                backendResult: formattedResult,
            });
        } catch (err) {
            const message = err.response?.data?.message || err.response?.data?.error || err.message || '简历上传失败，请稍后重试。';
            this.setState({ error: message, status: '', backendResult: '' });
        } finally {
            this.setState({ isUploading: false });
        }
    }

    render() {
        const { file, status, error, isUploading, backendResult } = this.state;

        return (
            <section className="upload-page" aria-labelledby="resume-upload-title">
                <div className="upload-backdrop" aria-hidden="true"></div>
                <div className="upload-shell">
                    <div className="upload-heading">
                        <span className="eyebrow">Interview question studio</span>
                        <h1 id="resume-upload-title">根据您的简历生成面试</h1>
                        <p id="resume-upload-desc">上传简历后，页面会展示面试问题、追问方向或分析结果。</p>
                    </div>

                    <div className="upload-workspace">
                        <div className="upload-panel">
                            <div className="upload-panel-heading">
                                <span>输入</span>
                                <strong>简历文件</strong>
                            </div>

                            <form className="upload-prompt" onSubmit={this.handleSubmit}>
                                <label className={file ? 'upload-dropzone has-file' : 'upload-dropzone'} htmlFor="resumeFile">
                                    <span className="upload-copy">
                                        <strong>{file ? file.name : '选择简历，生成面试问题'}</strong>
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

                                <button type="submit" className="upload-submit" disabled={isUploading}>
                                    {isUploading ? (
                                        <>
                                            <span className="button-spinner" aria-hidden="true"></span>
                                            <span>生成中</span>
                                        </>
                                    ) : (
                                        <>
                                            <span aria-hidden="true">↑</span>
                                            <span>上传并生成</span>
                                        </>
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

                        <div className="result-panel" aria-labelledby="backend-result-title">
                            <div className="result-toolbar">
                                <div>
                                    <span>输出</span>
                                    <h2 id="backend-result-title">后端返回结果</h2>
                                </div>
                                <span className={backendResult ? 'result-state ready' : 'result-state'}>
                                    {backendResult ? '已生成' : '等待上传'}
                                </span>
                            </div>
                            <output className={backendResult ? 'result-output has-result' : 'result-output'} aria-live="polite">
                                {backendResult || '上传简历后，后端返回的面试问题或分析结果会显示在这里。'}
                            </output>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
