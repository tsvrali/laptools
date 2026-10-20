import { SEOMetaManager, SEOMetaManagerProps } from '../seo/SEOMetaManager';

export interface SEOHeadProps extends SEOMetaManagerProps {}

export function SEOHead(props: SEOHeadProps) {
  return <SEOMetaManager {...props} />;
}

export { SEOMetaManager };
