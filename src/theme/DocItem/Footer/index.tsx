import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {usePluginData} from '@docusaurus/useGlobalData';

/**
 * DocItem/Footer 包装器 —— 在原页脚上方显示当前文档的 GitHub 贡献者。
 *
 * 数据由本地插件 `doc-contributors` 在构建时从 git log 提取并通过
 * setGlobalData 注入，运行时通过 usePluginData 获取。
 */

interface Contributor {
  name: string;
  email: string;
  username: string | null;
  profileUrl: string | null;
  avatarUrl: string | null;
}

/** 头像加载失败时替换为占位 span */
function hideBrokenImg(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  const span = document.createElement('span');
  span.className = 'doc-contributors__avatar doc-contributors__avatar--fallback';
  span.textContent = (img.alt || '?').charAt(0).toUpperCase();
  img.replaceWith(span);
}

export default function FooterWrapper(props) {
  const {metadata} = useDoc();
  const contributorsMap =
    usePluginData('doc-contributors') as Record<string, Contributor[]>;

  const sourcePath = metadata.source.replace(/^@site\//, '');
  const contributors: Contributor[] = contributorsMap?.[sourcePath] ?? [];

  if (contributors.length === 0) {
    return <Footer {...props} />;
  }

  return (
    <>
      <div className="doc-contributors">
        <div className="doc-contributors__header">
          <svg
            className="doc-contributors__icon"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
              0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
              -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
              2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
              0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82
              .64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82
              2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
              0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01
              1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016
              8c0-4.42-3.58-8-8-8z"
            />
          </svg>
          <span className="doc-contributors__title">本文贡献者</span>
        </div>
        <div className="doc-contributors__cards">
          {contributors.map((c) => {
            const hasProfile = !!c.profileUrl && !!c.avatarUrl;

            const inner = (
              <>
                {c.avatarUrl ? (
                  <img
                    className="doc-contributors__avatar"
                    src={c.avatarUrl}
                    alt={c.username ?? c.name}
                    loading="lazy"
                    onError={hideBrokenImg}
                  />
                ) : (
                  <span className="doc-contributors__avatar doc-contributors__avatar--fallback">
                    {(c.name).charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="doc-contributors__username">
                  {c.username || c.name}
                </span>
              </>
            );

            if (hasProfile) {
              return (
                <a
                  key={c.email}
                  href={c.profileUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="doc-contributors__card"
                  title={c.email}
                >
                  {inner}
                </a>
              );
            }

            return (
              <span
                key={c.email}
                className="doc-contributors__card"
                title={c.email}
              >
                {inner}
              </span>
            );
          })}
        </div>
      </div>
      <Footer {...props} />
    </>
  );
}
