import { useState, useEffect } from 'react';
import { EditablePage } from '@magnolia/react-editor';
import { languages, getCurrentLanguage } from '../utils';
import Basic from '../templates/pages/Basic';
import ReviewGrid from '../templates/components/ReviewGrid';
import SearchResults from '../templates/components/search/SearchResults';
import MediaTypeData from '../templates/components/MediaTypeData';
import MediaTypeList from '../templates/components/MediaTypeList';

const nodeName = '/recommend';
const config = {
  componentMappings: {
    'recommend-lm:pages/basic': Basic,
    'recommend-lm:components/reviewgrid': ReviewGrid,
    'recommend-lm:components/search/results': SearchResults,
    'recommend-lm:components/mediaTypeData': MediaTypeData,
    'recommend-lm:components/mediaTypeList': MediaTypeList,
  },
};

// Use different defaultBaseUrl to point to public instances
const defaultBaseUrl = process.env.NEXT_PUBLIC_MGNL_HOST;
const pagesApi = defaultBaseUrl + '/.rest/delivery/pages/v1';
const templateAnnotationsApi = defaultBaseUrl + '/.rest/template-annotations/v1';

export async function getServerSideProps(context) {
  const resolvedUrl = context.resolvedUrl;
  const currentLanguage = getCurrentLanguage(resolvedUrl);
  const isDefaultLanguage = currentLanguage === languages[0];
  let props = {
    basename: isDefaultLanguage ? '' : '/' + currentLanguage,
    pagePath: nodeName + context.resolvedUrl.replace(new RegExp('.*' + nodeName), ''), // Find out page path to fetch from Magnolia
  };

  // Fetching page content
  const pagesRes = await fetch(pagesApi + props.pagePath);
  props.page = await pagesRes.json();

  return {
    props,
  };
}

export default function Pathname(props) {
  const [templateAnnotations, setTemplateAnnotations] = useState();
  const { page, pagePath } = props;

  // Fetch template annotations only inside Magnolia WYSIWYG
  useEffect(() => {
    async function fetchTemplateAnnotations() {
      const templateAnnotationsRes = await fetch(templateAnnotationsApi + pagePath);
      const templateAnnotationsJson = await templateAnnotationsRes.json();

      setTemplateAnnotations(templateAnnotationsJson);
    }

    fetchTemplateAnnotations();
  }, [pagePath]);

  // In Pages app wait for template annotations before rendering EditablePage
  return (
    <EditablePage content={page} config={config} templateAnnotations={templateAnnotations} />
  );
}
